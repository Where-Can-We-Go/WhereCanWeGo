import { Card, Text } from "@mantine/core";

export default function Display(props) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="mb-3">
      <Text weight={500} className="mb-2">
        {props.name}
      </Text>

      <div className="flex justify-between">
        <Text size="sm" color="dimmed">
          {props.address}
        </Text>
        <Text size="sm" color="dimmed">
          {props.orgType}
        </Text>
      </div>
    </Card>
  );
}
