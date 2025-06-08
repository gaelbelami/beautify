"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Grape } from "lucide-react";
import { useTranslations } from "next-intl";

import React from "react";
import ForgotPasswordForm from "@/components/forms/forgot-password";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotpassword");

  return (
    <div className="min-h-[calc(100vh-160px)] mx-auto px-4 flex items-center justify-center relative">
      {/* Consistent Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-15">
        <div
          className="absolute inset-0
            bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.03),transparent)]"
        />
        <div
          className="pattern-dots pattern-primary-500 pattern-opacity-10 pattern-size-4 absolute
            inset-0"
        />

        {/* Floating Grape Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-full">
            <div className="absolute left-10 top-1/4 opacity-10 animate-float">
              <Grape className="w-24 h-24 text-primary/20" />
            </div>
            <div className="absolute right-20 top-1/3 opacity-15 animate-float-delayed">
              <Grape className="w-16 h-16 text-primary/25" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <Card
        className="rounded-3xl shadow-xl w-full max-w-lg bg-background/70 backdrop-blur-lg border
          border-border/20 mx-auto"
      >
        {/* Decorative Blobs */}
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/5 rounded-full blur-xl" />
        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-secondary/5 rounded-full blur-xl" />

        <div className="p-8">
          {/* Header Section */}
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex items-center justify-center gap-3">
              <div className="border rounded-xl border-primary p-2">
                <Grape className="w-8 h-8 text-primary" />
              </div>
              <h1
                className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text
                  text-transparent"
              >
                {t("title")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">{t("description")}</p>
          </div>

          {/* Forgot Password Form */}
          <ForgotPasswordForm />

          {/* Back to Login Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("rememberPassword")}{" "}
            <Link
              href="/reset-password"
              className="text-primary hover:underline font-medium"
            >
              {t("loginLink")}
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
