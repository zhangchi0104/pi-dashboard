import { ContainerListSummaryResponseItem as ContainerInfo } from '@/typings/response';
interface ContainerCardProps {
  containerInfo: ContainerInfo;
}
const ContainerCard = (props: ContainerCardProps) => {
  return (
    <div>
      {props.containerInfo.id}
    </div>
  )
};

export default ContainerCard;
