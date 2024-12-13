import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //Get the session token from local storage
  const token = localStorage.getItem('Session_Token');

  //Add headers as needed
  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Pass the modified request to next handler
  return next(modifiedRequest);
};
