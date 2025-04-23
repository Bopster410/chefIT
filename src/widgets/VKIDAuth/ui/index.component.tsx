"use client";
import React, { FunctionComponent, useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import { initVKSDK } from '../api';
import { userLoginVK } from '@/entities/user/api';
import { useRouter } from 'next/navigation';

export const VKIDOAuthWidget: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
        .on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, function (payload) {
          const code = payload.code;
          const deviceId = payload.device_id;
          userLoginVK(code,deviceId,sessionStorage.getItem("pkce_state") || "ABC").then((res)=>{
            if(res.Status !== 200) return;
            console.log(res);
          })
      });
    }
  }, []);

  return <div id="VkIdSdkOAuthList" ref={containerRef} />;
};
