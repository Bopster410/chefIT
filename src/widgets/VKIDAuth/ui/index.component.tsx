"use client";
import React, { FunctionComponent, useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import { initVKSDK } from '../api';

export const VKIDOAuthWidget: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    }
  }, []);

  return <div id="VkIdSdkOAuthList" ref={containerRef} />;
};
