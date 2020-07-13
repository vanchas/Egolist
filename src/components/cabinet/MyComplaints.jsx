export default function MyComplaints(props) {
  return (
    <div>
      <h3>Мои Жалобы</h3>
      {props.myComplaints && props.myComplaints.length ? (
        <ul>
          {props.myComplaints.map((c, i) => (
            <li key={i}>{c.complaint}</li>
          ))}
        </ul>
      ) : <div>Жалоб нет</div>}
    </div>
  );
}
