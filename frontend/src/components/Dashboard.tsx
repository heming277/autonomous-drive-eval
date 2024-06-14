import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, FormControl, Select, MenuItem, TextField, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PedestrianIcon from '@mui/icons-material/EmojiPeople';
import BicycleIcon from '@mui/icons-material/DirectionsBike';
import DetectionChart from './DetectionChart';
import FilterComponent from './FilterComponent';
import TrajectoryChart from './TrajectoryChart';

interface ObjectData {
  image_id: string;
  objects: Array<{ object_id: string; class: string; bbox: number[]; confidence: number }>;
  timestamp: string;
}

interface TrajectoryData {
  trajectory_id: string;
  vehicle_id: string;
  positions: PositionData[];
}

interface PositionData {
  timestamp: string;
  x: number;
  y: number;
  velocity: number;
  acceleration: number;
}

const Dashboard: React.FC = () => {
  const [objectDetection, setObjectDetection] = useState<ObjectData[]>([]);
  const [trajectory, setTrajectory] = useState<TrajectoryData[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<string[]>([]);
  const [velocityRange, setVelocityRange] = useState<[number, number]>([0, 100]);
  const [accelerationRange, setAccelerationRange] = useState<[number, number]>([0, 100]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/object-detection').then(response => {
      setObjectDetection(response.data);
    }).catch(error => console.error('Error loading object detection data:', error));
    axios.get('http://127.0.0.1:5000/api/trajectory').then(response => {
      setTrajectory(response.data);
    }).catch(error => console.error('Error loading trajectory data:', error));
  }, []);

  const filteredData = objectDetection.flatMap(item => 
    item.objects.filter(obj => filter === 'All' || obj.class === filter)
  );

  const handleVehicleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedVehicle(event.target.value as string[]);
  };

  const handleVelocityChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'min' | 'max') => {
    const value = Number(event.target.value);
    setVelocityRange(prevRange => type === 'min' ? [value, prevRange[1]] : [prevRange[0], value]);
  };

  const handleAccelerationChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'min' | 'max') => {
    const value = Number(event.target.value);
    setAccelerationRange(prevRange => type === 'min' ? [value, prevRange[1]] : [prevRange[0], value]);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" mt={3} mb={3}>
        <DirectionsBusIcon style={{ fontSize: 40, marginRight: 10 }} />
        <DirectionsCarIcon style={{ fontSize: 40, marginRight: 10 }} />
        <Typography variant="h4" component="div" align="center">
          Autonomous Drive Evaluation
        </Typography>
        <PedestrianIcon style={{ fontSize: 40, marginLeft: 10, marginRight: 10 }} />
        <BicycleIcon style={{ fontSize: 40 }} />
      </Box>
      <Typography variant="h5" gutterBottom align="center">
        Object Detection Data
      </Typography>
      <FilterComponent 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        options={[
          { value: 'All', label: 'All' },
          { value: 'car', label: 'Car' },
          { value: 'pedestrian', label: 'Pedestrian' },
          { value: 'cyclist', label: 'Cyclist' }
        ]} 
      />
      <DetectionChart data={filteredData} />
      <Typography variant="h5" gutterBottom align="center">
        Trajectory Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              multiple
              value={selectedVehicle}
              onChange={handleVehicleChange}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select Vehicles</em>;
                }
                return selected.join(', ');
              }}
            >
              {trajectory.map((traj) => (
                <MenuItem key={traj.vehicle_id} value={traj.vehicle_id}>
                  {traj.vehicle_id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Velocity Min"
            type="number"
            value={velocityRange[0]}
            onChange={(e) => handleVelocityChange(e, 'min')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Velocity Max"
            type="number"
            value={velocityRange[1]}
            onChange={(e) => handleVelocityChange(e, 'max')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Acceleration Min"
            type="number"
            value={accelerationRange[0]}
            onChange={(e) => handleAccelerationChange(e, 'min')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Acceleration Max"
            type="number"
            value={accelerationRange[1]}
            onChange={(e) => handleAccelerationChange(e, 'max')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TrajectoryChart data={trajectory} selectedVehicle={selectedVehicle} velocityRange={velocityRange} accelerationRange={accelerationRange} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;