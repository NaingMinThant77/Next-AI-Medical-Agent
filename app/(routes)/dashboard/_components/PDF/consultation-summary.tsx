import { Text, View } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";

interface Props {
  summary: string;
}

export default function ConsultationSummary({ summary }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Consultation Summary</Text>
      <View style={{ backgroundColor: "#F9FAFB", padding: 10, borderRadius: 5 }}>
        <Text style={styles.text}>{summary}</Text>
      </View>
    </View>
  );
}
