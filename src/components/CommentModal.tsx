import React, { useState } from "react";
import { Modal, Input } from "antd";

const { TextArea } = Input;

export default function CommentModal({
  visible,
  initial,
  onCancel,
  onSave,
}: any) {
  const [value, setValue] = useState(initial || "");

  // sync initial when modal opens
  React.useEffect(() => setValue(initial || ""), [initial, visible]);

  return (
    <Modal
      visible={visible}
      title="Add Comment"
      onCancel={onCancel}
      onOk={() => onSave(value)}
    >
      <TextArea
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  );
}
