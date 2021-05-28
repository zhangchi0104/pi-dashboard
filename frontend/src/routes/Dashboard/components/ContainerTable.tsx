import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Popover from '@material-ui/core/Popover';
import TableRow from '@material-ui/core/TableRow';
import { useTypedDispatch, useTypedSelector } from '@/store';
import { useEffect, useState, useCallback } from 'react';
import { fetchContainerInfo } from '@/store/dashboard';
import { getDurationStr } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useContainerTableState = () => {
  const containers = useTypedSelector((state) => state.dashboard.containerInfo);
  const dispatch = useTypedDispatch();
  const stableDispatch = useCallback(dispatch, []);
  useEffect(() => {
    const _fetchContainerInfo = () => {
      stableDispatch(fetchContainerInfo());
    };
    _fetchContainerInfo();
  }, [stableDispatch]);
  return containers;
};
const useTableStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1, 2),
    // backgroundColor: theme.palette.secondary.main,
  },
}));
export const ContainerTable = () => {
  const containers = useContainerTableState();
  const classes = useTableStyles();
  return (
    <Paper>
      <Typography component="h2" variant="h5" className={classes.title}>
        Docker Container
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ports</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {containers.map((container) => (
              <TableRow key={container.id}>
                <TableCell>{container.name}</TableCell>
                <TableCell>{container.service}</TableCell>
                <TableCell>{getDurationStr(container.created, true)}</TableCell>
                <TableCell>{container.status}</TableCell>
                <TableCell>
                  <PortInfo
                    ports={container.ports}
                    containerName={container.name}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

interface Port {
  IP?: string;
  PublicPort?: number | string;
  Type: string | string;
  PrivatePort: number;
}

const usePortInfoState = () => {
  const [anchorEl, setanchorEl] = useState<Element | null>(null);
  const showPopover = (event: React.MouseEvent) => {
    console.log('opened');
    setanchorEl(event.currentTarget as Element);
  };
  const closePopover = () => {
    console.log('closed');
    setanchorEl(null);
  };
  const popoverOpen = anchorEl !== null;
  return { showPopover, closePopover, popoverOpen, anchorEl };
};

const usePortInfoStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const PortInfo = ({
  ports,
  containerName,
}: {
  ports: Port[];
  containerName: string;
}) => {
  const { showPopover, closePopover, popoverOpen, anchorEl } =
    usePortInfoState();
  const classes = usePortInfoStyles();
  const buildPortsStr = (p: Port) => {
    const ipStr = p?.IP ? `${p.IP}:` : '';
    const publicPortStr = p?.PublicPort ? `->${p.PublicPort}` : '';
    return `${ipStr}${p.PrivatePort}${publicPortStr}/${p.Type}`;
  };
  switch (ports.length) {
    case 0:
      return <>No ports exposed</>;
    case 1:
      return <>{buildPortsStr(ports[0])}</>;
    default:
      return (
        <div>
          <span
            onMouseEnter={(event) => showPopover(event)}
            onMouseLeave={closePopover}
          >
            {buildPortsStr(ports[0])}
          </span>
          <Popover
            style={{ pointerEvents: 'none' }}
            classes={{ paper: classes.paper }}
            open={popoverOpen}
            anchorEl={anchorEl}
            disableRestoreFocus
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {ports.map((p, i) => (
              <Typography
                component="p"
                key={`${containerName}-${p?.PrivatePort}/${p.Type}-${i}`}
              >
                {buildPortsStr(p)}
              </Typography>
            ))}
          </Popover>
        </div>
      );
  }
};
