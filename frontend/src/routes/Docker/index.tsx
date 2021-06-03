import ContainerCard from './components/ContainerCard';
const fakeInfo = {
  id: 'Sample container',
  name: 'Sample Container',
  created: 1900000,
  status: 'Up for 10 days',
  ports: [],
  service: null,
};
const DockerRoute = () => {
  return (
    <div>
      <ContainerCard containerInfo={fakeInfo} />
    </div>
  );
};

export default DockerRoute;
