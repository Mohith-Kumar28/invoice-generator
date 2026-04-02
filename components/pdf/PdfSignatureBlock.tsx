import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";

export function PdfSignatureBlock({
  imageSrc,
  typedText,
  roleText,
  textColor = "#111827",
  dividerColor = "#E5E7EB",
  align = "right",
  width = 220,
}: {
  imageSrc?: string;
  typedText?: string;
  roleText?: string;
  textColor?: string;
  dividerColor?: string;
  align?: "left" | "right";
  width?: number;
}) {
  const wrapStyle = [
    styles.wrap,
    align === "right" ? styles.wrapRight : styles.wrapLeft,
    { width },
  ];
  return (
    <View wrap={false} style={wrapStyle}>
      <Text style={[styles.title, { color: textColor }]}>Signature</Text>
      <View style={{ marginTop: 18 }}>
        {imageSrc ? (
          <Image src={imageSrc} style={styles.image} />
        ) : typedText ? (
          <Text
            style={[
              styles.typed,
              {
                color: textColor,
              },
            ]}
          >
            {typedText}
          </Text>
        ) : null}
      </View>
      <View style={[styles.divider, { backgroundColor: dividerColor }]} />
      <Text style={[styles.role, { color: textColor }]}>{roleText || ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 16,
  },
  wrapRight: {
    alignSelf: "flex-end",
  },
  wrapLeft: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 11,
    fontWeight: 700,
  },
  image: {
    width: 140,
    height: 40,
    objectFit: "contain",
  },
  typed: {
    fontSize: 16,
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    marginTop: 6,
    marginBottom: 2,
  },
  role: {
    fontSize: 10,
  },
});
