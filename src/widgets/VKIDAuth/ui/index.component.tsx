"use client";
import React, { FunctionComponent, useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import { initVKSDK } from '../api';
import { userLoginVK } from '@/entities/user/api';
import { useRouter } from 'next/navigation';
import { useChangeRequired } from '@/app/providers/userProvider/index.store';
import { Props } from './index.types';

export const VKIDOAuthWidget: FunctionComponent<Props> = (
  {handleError}
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const changeRequired = useChangeRequired();

  useEffect(() => {
    initVKSDK();

    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const oauthList = new VKID.OAuthList();
      const oauthListNames = [
        VKID.OAuthName.VK,
        VKID.OAuthName.MAIL,
        VKID.OAuthName.OK,
      ];

      oauthList
        .render({
          container: containerRef.current,
          oauthList: oauthListNames,
          scheme: VKID.Scheme.LIGHT,
          lang: VKID.Languages.RUS,
          styles: {
            height: 44,
            borderRadius: 8,
          },
        })
        .on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, function (payload: { code: string; device_id: string; }) {
          const code = payload.code;
          const deviceId = payload.device_id;
          const state = sessionStorage.getItem("pkce_state");
          console.log("Login success")
          if(!state){
            console.log("Ошибка приема state");
            return;
          }
          userLoginVK(code,deviceId, state).then((res)=>{
            if(res.Status !== 200) return;
            changeRequired(false);
            console.log(res);

            router.push("./");
          })
      })
      .on(VKID.WidgetEvents.ERROR, handleError);
    }
  }, [changeRequired,router]);

  return <div id="VkIdSdkOAuthList" ref={containerRef} />;
};
