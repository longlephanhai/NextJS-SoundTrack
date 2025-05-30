interface IProps {
  params: { slug: string }
}
const DetailTrackPage = (props: IProps) => {
  const { params } = props;
  return (
    <div>DetailTrackPage</div>
  )
}

export default DetailTrackPage;