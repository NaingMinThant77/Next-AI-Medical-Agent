"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";
import { Download, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import MedicalReportPDF from "./PDF/medical-report-pdf";

type props = {
  record: SessionDetail;
};

const ViewReportDialog = ({ record }: props) => {
  const report = record.report as any;
  const conversation = (record as any).conversation || [];
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const doc = <MedicalReportPDF record={record} />;
      const pdfBlob = await pdf(doc).toBlob();

      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `medical-report-${record.id}-${moment(new Date(record.createdOn)).format("YYYY-MM-DD")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
        >
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <DialogTitle className="text-left">
            <div className="text-2xl font-bold text-foreground">
              Medical AI Voice Agent Report
            </div>
          </DialogTitle>
          <Button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isGenerating ? "Generating..." : "Download PDF"}
          </Button>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Doctor Information */}
          <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Consultation Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-primary">
                  AI Medical Specialist:
                </span>
                <p className="text-foreground font-medium">
                  {record.selectedDoctor.specialist}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {record.selectedDoctor.description}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-primary">
                  Consultation Date:
                </span>
                <p className="text-foreground">
                  {moment(new Date(record.createdOn)).format(
                    "MMMM DD, YYYY at h:mm A",
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {moment(new Date(record.createdOn)).fromNow()}
                </p>
              </div>
            </div>
          </div>

          {/* Chief Complaint */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Chief Complaint
            </h3>
            <p className="text-foreground bg-muted p-4 rounded-md">
              {report?.chiefComplaint ||
                record.notes ||
                "No chief complaint recorded"}
            </p>
          </div>

          {/* Symptoms */}
          {report?.symptoms && report.symptoms.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Identified Symptoms
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.symptoms.map((symptom: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-destructive/10 text-destructive rounded-md text-sm font-medium"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Duration and Severity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report?.duration && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Duration
                </h3>
                <p className="text-foreground">{report.duration}</p>
              </div>
            )}

            {report?.severity && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Severity
                </h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      report.severity === "Severe"
                        ? "bg-destructive"
                        : report.severity === "Moderate"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                    }`}
                  />
                  <span className="text-foreground font-medium">
                    {report.severity}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          {report?.summary && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Consultation Summary
              </h3>
              <p className="text-foreground leading-relaxed bg-muted p-4 rounded-md">
                {report.summary}
              </p>
            </div>
          )}

          {/* Recommendations */}
          {report?.recommendations && report.recommendations.length > 0 && (
            <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Recommendations
              </h3>
              <ul className="space-y-2">
                {report.recommendations.map(
                  (recommendation: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-foreground">{recommendation}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {/* Medications Mentioned */}
          {report?.medicationsMentioned &&
            report.medicationsMentioned.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Medications Mentioned
                </h3>
                <div className="space-y-2">
                  {report.medicationsMentioned.map(
                    (medication: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-foreground">{medication}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {/* Conversation Preview */}
          {conversation && conversation.length > 0 && (
            <div className="bg-muted rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Conversation Preview
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {conversation.map((msg: any, index: number) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground border border-border"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-border pt-4">
            <div className="flex flex-col items-center justify-between text-sm text-muted-foreground">
              <span className="text-primary font-bold">
                User: {record?.createdBy}
              </span>
              <span>Report generated by AI Medical Voice Agent</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportDialog;
