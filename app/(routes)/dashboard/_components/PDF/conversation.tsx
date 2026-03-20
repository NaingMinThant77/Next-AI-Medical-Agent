import { Text, View } from "@react-pdf/renderer";
import { styles } from "./medical-report-styles";

interface Props {
  conversation: Array<{ role: string; text: string }>;
}

export default function Conversation({ conversation }: Props) {
  if (!conversation || conversation.length === 0) return null;

  return (
    <View style={[styles.section, { backgroundColor: "#F3F4F6", padding: 10, borderRadius: 5 }]}>
      <Text style={styles.sectionTitle}>Conversation Preview</Text>
      {conversation.slice(0, 10).map((msg: any, index: number) => (
        <View 
          key={index} 
          style={{
            flexDirection: msg.role === "user" ? "row-reverse" : "row",
            marginBottom: 5,
          }}
        >
          <View style={[
            styles.conversationBubble,
            msg.role === "user" ? styles.userMessage : styles.aiMessage
          ]}>
            <Text>{msg.text}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
