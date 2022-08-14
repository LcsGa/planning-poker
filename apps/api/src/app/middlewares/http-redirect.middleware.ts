import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { environment } from "../../environments/environment";

@Injectable()
export class HttpRedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.secure) {
      const httpsUrl = `https://${req.hostname}:${environment.httpsPort}${req.originalUrl}`;
      res.redirect(HttpStatus.PERMANENT_REDIRECT, httpsUrl);
    } else {
      next();
    }
  }
}
