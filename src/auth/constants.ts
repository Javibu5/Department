import { SetMetadata } from '@nestjs/common';

//Do not expose this key publicly. We have done so here to make it clear what the code is doing, 
//but in a production system you must protect this key using appropriate measures such as a secrets vault, 
//environment variable, or configuration service.

export const jwtConstants = {
    secret: 'secretKey',
  };


  export const  APP_GUARD = "APP_GUARD";



export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);