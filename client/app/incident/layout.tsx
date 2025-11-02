"use client";

import { BottomContentContainer } from "@/components/page-container";
import SpeakIndicator from "@/components/ui/SpeakIndicator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import spfLogo from "@/public/singaporepolice.jpg";

export default function IncidentPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col justify-between items-center box-border">
      {/* Enhanced SPF Header with Breadcrumbs */}
      <div className="w-full bg-[#131745] shadow-lg">
        <div className="max-w-[120rem] mx-auto px- py-6 flex-col flex items-center justify-center">
          {/* SPF Branding */}
          <div className="flex items-center gap-4 mb-4">
            <Image src={spfLogo} alt="SPF Logo" height={80} />
            {/* <div>
              <h1 className="text-white text-xl font-bold">Singapore Police Force</h1>
            </div> */}
          </div>
          
          {/* Breadcrumb Navigation */}
          <div>
            <Breadcrumb>
              <BreadcrumbList className="text-blue-100">
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="/" 
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-blue-300" />
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-white font-medium">
                    Report an Incident
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-16 w-full flex-1 p-6">
        {children}
      </div>

      <BottomContentContainer>
        <SpeakIndicator />
      </BottomContentContainer>
    </div>
  );
}
