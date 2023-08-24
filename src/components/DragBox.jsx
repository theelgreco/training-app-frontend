export default function DragBox({ Child, childProps, id, boxStyle }) {
  return (
    <drag-box id={id} style={boxStyle}>
      <Child props={childProps} />
    </drag-box>
  );
}
