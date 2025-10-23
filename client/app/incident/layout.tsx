"use client";

import { BottomContentContainer } from "@/components/PageContainer";
import SpeakIndicator from "@/components/ui/SpeakIndicator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function IncidentPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col justify-between items-center p-6 box-border">
      <div className="w-full flex flex-col justify-center items-center gap-5 p-3">
        <Breadcrumb>
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
      </div>

      <div className="flex flex-col justify-center items-center gap-16 w-full">
        {children}
      </div>

      <BottomContentContainer>
        <SpeakIndicator />
      </BottomContentContainer>
    </div>
  );
}
