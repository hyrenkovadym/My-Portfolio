import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user account" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", example: "demo.user@example.com" },
        password: { type: "string", example: "ChangeMe_User_123!" },
      },
    },
  })
  register(@Body() body: any) {
    return this.auth.register(body.email, body.password);
  }

  @Post("login")
  @ApiOperation({ summary: "Login and receive access/refresh tokens" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", example: "demo.user@example.com" },
        password: { type: "string", example: "ChangeMe_User_123!" },
      },
    },
  })
  login(@Body() body: any) {
    return this.auth.login(body.email, body.password);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token using refresh token" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: { type: "string" },
      },
    },
  })
  refresh(@Body() body: any) {
    return this.auth.refresh(body.refreshToken);
  }

  @Post("logout")
  @ApiOperation({ summary: "Revoke refresh token (logout)" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: { type: "string" },
      },
    },
  })
  logout(@Body() body: any) {
    return this.auth.logout(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current authenticated user payload" })
  me(@Req() req: any) {
    return req.user;
  }
}
