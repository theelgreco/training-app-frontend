import DragBox from "./DragBox";

export default function DragContainer({
  data,
  containerStyle,
  containerRef,
  boxStyle,
  boxContent,
  idKey,
}) {
  console.log(data);
  return (
    <>
      <drag-container style={containerStyle} ref={containerRef}>
        {data.map((object, index) => {
          return (
            <DragBox
              key={index}
              childProps={data[index]}
              id={object[idKey]}
              Child={boxContent}
              boxStyle={boxStyle}
            />
          );
        })}
      </drag-container>
    </>
  );
}
