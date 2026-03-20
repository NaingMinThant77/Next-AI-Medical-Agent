import { Text, View } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";

interface Props {
  duration?: string;
  severity?: string;
}

export default function DurationSeverity({ duration, severity }: Props) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Severe":
        return "#DC2626";
      case "Moderate":
        return "#CA8A04";
      case "Mild":
        return "#16A34A";
      default:
        return "#6B7280";
    }
  };

  return (
    <View style={styles.grid}>
      {duration && (
        <View style={[styles.gridItem, { backgroundColor: "#F9FAFB", padding: 10, borderRadius: 5 }]}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <Text style={styles.text}>{duration}</Text>
        </View>
      )}

      {severity && (
        <View style={[styles.gridItem, { backgroundColor: "#F9FAFB", padding: 10, borderRadius: 5 }]}>
          <Text style={styles.sectionTitle}>Severity</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ 
              width: 6, 
              height: 6, 
              borderRadius: 3, 
              backgroundColor: getSeverityColor(severity),
              marginRight: 5 
            }} />
            <Text style={styles.text}>{severity}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
