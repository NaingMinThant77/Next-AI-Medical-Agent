import { Text, View } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";

interface Props {
  symptoms: string[];
}

export default function Symptoms({ symptoms }: Props) {
  if (!symptoms || symptoms.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Identified Symptoms</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {symptoms.map((symptom: string, index: number) => (
          <View key={index} style={styles.symptomTag}>
            <Text>{symptom}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
