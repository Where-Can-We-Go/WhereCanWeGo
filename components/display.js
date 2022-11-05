import { Card, Text } from "@mantine/core";

export default function Display() {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="mb-3">
      <Text weight={500} className="mb-2">
        Default Name
      </Text>

      <div className="flex justify-between">
        <Text size="sm" color="dimmed">
          Default Address
        </Text>
        <Text size="sm" color="dimmed">
          Org Type
        </Text>
      </div>
    </Card>
  );
}
