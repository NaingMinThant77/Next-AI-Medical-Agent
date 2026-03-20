import { Text, View } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";
import moment from "moment";

interface Props {
  specialist: string;
  description: string;
  createdOn: string;
}

export default function MedicalReportHeader({ specialist, description, createdOn }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Medical AI Voice Agent Report</Text>
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.label}>AI Medical Specialist:</Text>
          <Text style={styles.text}>{specialist}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.label}>Consultation Date:</Text>
          <Text style={styles.text}>
            {moment(new Date(createdOn)).format("MMMM DD, YYYY at h:mm A")}
          </Text>
          <Text style={styles.text}>
            {moment(new Date(createdOn)).fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
}
