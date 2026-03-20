"use client";

import { Document, Page } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";
import MedicalReportHeader from "./medical-report-header";
import ChiefComplaint from "./chief-complaint";
import Symptoms from "./symptoms";
import DurationSeverity from "./duration-severity";
import ConsultationSummary from "./consultation-summary";
import Recommendations from "./recommendations";
import Medications from "./medications";
import Conversation from "./conversation";
import MedicalReportFooter from "./medical-report-footer";
import { SessionDetail } from "../../medical-agent/[sessionId]/page";

type MedicalReportPDFProps = {
  record: SessionDetail;
};

const MedicalReportPDF = ({ record }: MedicalReportPDFProps) => {
  const report = record.report as any;
  const conversation = (record as any).conversation || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <MedicalReportHeader
          specialist={record.selectedDoctor.specialist}
          description={record.selectedDoctor.description}
          createdOn={record.createdOn}
        />

        <ChiefComplaint
          chiefComplaint={report?.chiefComplaint}
          notes={record.notes}
        />

        <Symptoms symptoms={report?.symptoms} />

        <DurationSeverity
          duration={report?.duration}
          severity={report?.severity}
        />

        {report?.summary && <ConsultationSummary summary={report.summary} />}

        <Recommendations recommendations={report?.recommendations} />

        <Medications medications={report?.medicationsMentioned} />

        <Conversation conversation={conversation} />

        <MedicalReportFooter createdBy={record?.createdBy} />
      </Page>
    </Document>
  );
};

export default MedicalReportPDF;
