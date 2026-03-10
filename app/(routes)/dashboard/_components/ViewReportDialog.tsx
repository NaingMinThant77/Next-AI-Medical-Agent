/* eslint-disable @typescript-eslint/no-explicit-any */
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

type props = {
  record: SessionDetail;
};

const ViewReportDialog = ({ record }: props) => {
  console.log("Medical Record", record);

  const report = record.report as any;
  const conversation = (record as any).conversation || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
        >
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Medical AI Voice Agent Report
              </h2>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Doctor Information */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Consultation Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-blue-700">
                  AI Medical Specialist:
                </span>
                <p className="text-gray-900 font-medium">
                  {record.selectedDoctor.specialist}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {record.selectedDoctor.description}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-blue-700">
                  Consultation Date:
                </span>
                <p className="text-gray-900">
                  {moment(new Date(record.createdOn)).format(
                    "MMMM DD, YYYY at h:mm A",
                  )}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {moment(new Date(record.createdOn)).fromNow()}
                </p>
              </div>
            </div>
          </div>

          {/* Chief Complaint */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Chief Complaint
            </h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md">
              {report?.chiefComplaint ||
                record.notes ||
                "No chief complaint recorded"}
            </p>
          </div>

          {/* Symptoms */}
          {report?.symptoms && report.symptoms.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Identified Symptoms
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.symptoms.map((symptom: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-red-50 text-red-700 rounded-md text-sm font-medium"
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
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Duration
                </h3>
                <p className="text-gray-700">{report.duration}</p>
              </div>
            )}

            {report?.severity && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Severity
                </h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      report.severity === "Severe"
                        ? "bg-red-500"
                        : report.severity === "Moderate"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <span className="text-gray-700 font-medium">
                    {report.severity}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          {report?.summary && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Consultation Summary
              </h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md">
                {report.summary}
              </p>
            </div>
          )}

          {/* Recommendations */}
          {report?.recommendations && report.recommendations.length > 0 && (
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                Recommendations
              </h3>
              <ul className="space-y-2">
                {report.recommendations.map(
                  (recommendation: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {/* Medications Mentioned */}
          {report?.medicationsMentioned &&
            report.medicationsMentioned.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Medications Mentioned
                </h3>
                <div className="space-y-2">
                  {report.medicationsMentioned.map(
                    (medication: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-gray-700">{medication}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {/* Conversation Preview */}
          {conversation && conversation.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Conversation Preview
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {conversation.slice(0, 6).map((msg: any, index: number) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {conversation.length > 6 && (
                  <div className="text-center text-gray-500 text-sm">
                    ... and {conversation.length - 6} more messages
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col items-center justify-between text-sm text-gray-500">
              <span className="text-blue-600 font-bold">
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
