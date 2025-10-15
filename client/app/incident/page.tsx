"use client";

import { BottomContentContainer, MainContentContainer, PageContainer, TopContentContainer } from "@/components/ui/PageContainer";
import HeaderText from "@/components/ui/HeaderText";
import { useState } from "react";
import SpeakIndicator from "@/components/ui/SpeakIndicator";
import { 
  Breadcrumb, 
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ReportFormUI from "@/components/ui/ReportFormUI";
import { exampleIncidentReport } from "@/model/ReportForm";

export default function IncidentPage() {
  return (
    <PageContainer>
      <TopContentContainer>
        <Breadcrumb >
          <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Report an Incident</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
      </TopContentContainer>

      <MainContentContainer>
        <ReportFormUI form={exampleIncidentReport}/>

        {/* <HeaderText>Report an Incident</HeaderText>

        <FieldSet style={{ maxWidth: "50%", width: "100%" }}>
          <FieldLegend>What best describes the incident?</FieldLegend>
          <FieldDescription>This appears on invoices and emails.</FieldDescription>
          <FieldGroup>
            {/* these cards are arranged in a 3-wide grid
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
              <Card>
                <CardHeader>
                  <CardTitle>Accident</CardTitle>
                  <CardDescription>Report an accident</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Accident</CardTitle>
                  <CardDescription>Report an accident</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Accident</CardTitle>
                  <CardDescription>Report an accident</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Accident</CardTitle>
                  <CardDescription>Report an accident</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Accident</CardTitle>
                  <CardDescription>Report an accident</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <FieldDescription>This appears on invoices and emails.</FieldDescription>
              <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" autoComplete="off" aria-invalid />
              <FieldError>Choose another username.</FieldError>
            </Field>
            <Field orientation="horizontal">
              <Switch id="newsletter" />
              <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet> */}
      </MainContentContainer>

      <BottomContentContainer>
        <SpeakIndicator />
      </BottomContentContainer>
    </PageContainer>
  );
}
