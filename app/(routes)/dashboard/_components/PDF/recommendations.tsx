import { Text, View } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";

interface Props {
  recommendations: string[];
}

export default function Recommendations({ recommendations }: Props) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <View style={[styles.section, { backgroundColor: "#EFF6FF", padding: 10, borderRadius: 5 }]}>
      <Text style={[styles.sectionTitle, { color: "#2563EB" }]}>Recommendations</Text>
      {recommendations.map((recommendation: string, index: number) => (
        <View key={index} style={styles.recommendationItem}>
          <Text style={styles.bullet}>✓</Text>
          <Text style={styles.text}>{recommendation}</Text>
        </View>
      ))}
    </View>
  );
}
