export const tokopediaHeader = new Headers();
tokopediaHeader.append("host", "gql.tokopedia.com");
tokopediaHeader.append("connection", "keep-alive");
tokopediaHeader.append("cache-control", "max-age=0");
tokopediaHeader.append("sec-ch-ua-mobile", "?0");
tokopediaHeader.append("dnt", "1");
tokopediaHeader.append("upgrade-insecure-requests", "1");
tokopediaHeader.append(
  "user-agent",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
);
tokopediaHeader.append(
  "accept",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
);
tokopediaHeader.append("sec-fetch-site", "none");
tokopediaHeader.append("sec-fetch-mode", "navigate");
tokopediaHeader.append("sec-fetch-user", "?1");
tokopediaHeader.append("sec-fetch-dest", "document");
tokopediaHeader.append("accept-encoding", "gzip, deflate, br");
tokopediaHeader.append(
  "accept-language",
  "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ko;q=0.6",
);
tokopediaHeader.append(
  "cookie",
  "_UUID_NONLOGIN_=2aded6f12cf8651bc1fb57e4983cb2fb; _UUID_NONLOGIN_.sig=v2MkrZ8LM5wWktMv5oWU0OdanYI; DID=4ca73ae221111d0081eef8eff2ff48c38f7dbb519169025bba3f91c5b61f68d03a88cbdb84a8b57a5b77e166c1e35c80; DID_JS=NGNhNzNhZTIyMTExMWQwMDgxZWVmOGVmZjJmZjQ4YzM4ZjdkYmI1MTkxNjkwMjViYmEzZjkxYzViNjFmNjhkMDNhODhjYmRiODRhOGI1N2E1Yjc3ZTE2NmMxZTM1Yzgw47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; __auc=db48f0c1176a2e432013a231300; _jx=062dc650-480d-11eb-94dd-39d7142cbf7f; hfv_banner=true; zarget_visitor_info=%7B%7D; l=1; TOPATK=egZX7SDYSxK1CyjGgOkzsw; TOPRTK=qh9k_35-T_KV7cBtCVtdKA; aus=1; _SID_Tokopedia_=o3SSh_9B3vcppFX2fuxZ8T-a6-pJrGY-E0zlrOdcTs2L5QtGxbwnINWCOz5ij6U9IdTGcYZbrsCEtVgFeZ9mOnzAGopinEpHJe0nfGPRSon8q-AlayA5j-aeV1tjZyvn; _BID_TOKOPEDIA_=fa1131f63baf9bd18f33b27eb1f51ce6; cto_bundle=LRqAO19vTW4lMkJmOTF3THRDem1abzlCdDQ3M0lmSXA0Z2xuYkxxdFBWQXU2JTJCMTR5a3F6NG1iOUx0TWFkdGwzUUlpc0hjQXY4WWFZUk9QU0tRJTJGbyUyRnFCbHJyaDdEOG5ydWREYW5WcUttb09EcU5vQjRRJTJCaDFGJTJGVWM0R2l3ejl0d0VhNjdqYzZqb1R2UlVzJTJCaXh5RW5hcDVtMktXZyUzRCUzRA; _gcl_au=1.1.411143577.1643433446; _gcl_aw=GCL.1643610079.Cj0KCQiAi9mPBhCJARIsAHchl1zhJjj-RFZ36Rm3TJE_Ivf2P7cHm1762YUOZrSUWfQFNyAY_mKxMGAaArzFEALw_wcB; _gcl_dc=GCL.1643610079.Cj0KCQiAi9mPBhCJARIsAHchl1zhJjj-RFZ36Rm3TJE_Ivf2P7cHm1762YUOZrSUWfQFNyAY_mKxMGAaArzFEALw_wcB; _gac_UA-126956641-6=1.1643610079.Cj0KCQiAi9mPBhCJARIsAHchl1zhJjj-RFZ36Rm3TJE_Ivf2P7cHm1762YUOZrSUWfQFNyAY_mKxMGAaArzFEALw_wcB; _gac_UA-9801603-1=1.1643610081.Cj0KCQiAi9mPBhCJARIsAHchl1zhJjj-RFZ36Rm3TJE_Ivf2P7cHm1762YUOZrSUWfQFNyAY_mKxMGAaArzFEALw_wcB; _UUID_CAS_=603e1040-bd75-4077-8bcf-6864d0c55031; _CASE_=7821674a672139323530372f21624a67213931313b35343036332f216f616f213921736c6d676c682361626b6271234e6a7162235066776a627062716a212f21604a6721393237352f216f6c6d642139213233352d353a343136373035343234313431212f216f62772139212e352d31333236363234343a3a363a3a3236212f2173406c2139213236323737212f21744a672139323235333534333a2f21704a67213932323630333634307e; _ga=GA1.2.347542738.1609050628; _ga_70947XW48P=GS1.1.1646609519.266.1.1646609769.12; _abck=96A4B7D5B9137E2E484147999561D205~0~YAAQFaIAF6wMy2Z/AQAAFo9vcQcmf6wiLgp0+grxeGXg4Y89PoJZzzqBopcjiPHP1GMEqvCCuQ6xoI84jqnh7MaPK7ll3YqfwFlJwOHVYAHdxNhI8fkMeYYmEdK54YWhZXbj91PIlRm4qPhIpPRZpX68G8oB74vrKPTOMVGSd9VyrVcIpQSu2vksGGx871nO7eWieivKrYSXJIFA8akK0dtG8DxWYFZ/UwMxbcz+HH0Pk89O9hVt5a990O0F9NYO6DgoWn/tLHJSZqvF7v9msgaV3JJXavX3YXie3sZk9V0ox3OwVmkH8G9f4atzaWoFHqsFHe5L2Blud4pKIFdclr3fvQBJ5gElRl6MY25F3/HG9eKbfcXLn5K4ZMMWxvbggySrUVOrzFbzrkB9XUk/qzzLPK3mKPaAfhPF~-1~-1~-1; bm_sz=1C8FEA2C02CD5E488CBF03F544D35996~YAAQFaIAF60My2Z/AQAAFo9vcQ8gkdttmXiRBIlmW+unTxsLl798pnUpvskbb0iFvflWSxpvglcWlz6dyh4wNpZ+cjMTiTB9ncJE4phszCvV7rmfWgGXoHKKrgFZ4vt/F0hkkmAH6tiknUYinJDdU2QzWoHwdclkO+nDTW/hVmeDStDvgcAWc0upnq0V090C2/YDfEAsafSjTTNWELh3gNZDLl/k8p8xZ2ApKjEF7L9h0Ce/qqU6T7z0XiSxPgEBEu3K97q0ZxtAnMGcNTwCLe53xFWiiMEA3YrMLULzK9gfaX3zN5Q=~4535091~4604227; _abck=96A4B7D5B9137E2E484147999561D205~-1~YAAQQf5eb5mforaAAQAAMXXs5Af7wquDCQ/Vu7LGJRbbgPzd/JTAUVL84Qi+/Ihn6TN6WgR15+sYD2vr/lhS9vsiIUsNjanYFiM0NsbyCCouztS5l4kp05LRymUX67RiYkb1wb8Q05Ou8Gi8QqoDLWiarRunMAfT4+Yg57Mh37DKmLlkOmwS+fflgUsY4kwuATSCxZScKBJhE2qo4Y6usDYDoJVhAm+WlM6mBAeOt5p1QdDLfCM8qOhlP6s/xu44C9GoAnZgeYnukmzN5Si0FQ61P+IET7DdnEWFWjXILS2Bg0VkEATmwMFD6fpvbohFrxxm7yVJRDEugOmTTAZFPqUEXHniN9lBdgf1bjpVpRnJT/IqSaRFWIz8Vr2lNYr3Aw==~0~-1~-1",
);
tokopediaHeader.append("Content-Type", "application/json");
