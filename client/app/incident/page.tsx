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

export default function IncidentPage() {

  const headerStyle: React.CSSProperties = {
    fontSize: "clamp(28px, 6vw, 56px)",
    fontWeight: 800,
    textAlign: "center",
    margin: 0,
  };

  const micIcon: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#ef4444",
    color: "white",
    marginLeft: 8,
    marginRight: 8,
  };

  const bottomBar: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    padding: "12px",
  };

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
        <HeaderText>Report an Incident</HeaderText>
      </MainContentContainer>

      <BottomContentContainer>
        <SpeakIndicator />
      </BottomContentContainer>
    </PageContainer>
  );
}
