import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #E5E7EB",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1F2937",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#374151",
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    color: "#1F2937",
    lineHeight: 1.4,
  },
  label: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 2,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    marginRight: 10,
  },
  symptomTag: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
    padding: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 8,
    fontWeight: "medium",
    marginRight: 3,
    marginBottom: 3,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  bullet: {
    color: "#2563EB",
    marginRight: 3,
    fontSize: 8,
  },
  medicationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  medicationDot: {
    width: 2,
    height: 2,
    backgroundColor: "#2563EB",
    borderRadius: 1,
    marginRight: 5,
  },
  conversationBubble: {
    maxWidth: "80%",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 8,
  },
  userMessage: {
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
    border: "1 solid #E5E7EB",
    alignSelf: "flex-start",
  },
  footer: {
    marginTop: 20,
    borderTop: "1 solid #E5E7EB",
    paddingTop: 10,
    fontSize: 8,
    color: "#6B7280",
    textAlign: "center",
  },
});
