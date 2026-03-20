import { Text, View } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";

interface Props {
  chiefComplaint: string;
  notes: string;
}

export default function ChiefComplaint({ chiefComplaint, notes }: Props) {
  const complaint = chiefComplaint || notes || "No chief complaint recorded";
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Chief Complaint</Text>
      <View style={{ backgroundColor: "#F9FAFB", padding: 10, borderRadius: 5 }}>
        <Text style={styles.text}>{complaint}</Text>
      </View>
    </View>
  );
}
