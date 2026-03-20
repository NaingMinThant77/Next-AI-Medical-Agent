import { Text, View } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";

interface Props {
  medications: string[];
}

export default function Medications({ medications }: Props) {
  if (!medications || medications.length === 0) return null;

  return (
    <View style={[styles.section, { backgroundColor: "#F9FAFB", padding: 10, borderRadius: 5 }]}>
      <Text style={styles.sectionTitle}>Medications Mentioned</Text>
      {medications.map((medication: string, index: number) => (
        <View key={index} style={styles.medicationItem}>
          <View style={styles.medicationDot} />
          <Text style={styles.text}>{medication}</Text>
        </View>
      ))}
    </View>
  );
}
