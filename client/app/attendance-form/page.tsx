'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useStore } from '@/lib/mock-data';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWlyYW5mYW0tMTIzIiwiYSI6ImNtMnUwa3AwNjA5MTAyanB4aGtxNXlkanUifQ.oYbW0ZPDHKZ8_fwy7ilmyA';

export default function AttendanceFormPage() {
  const currentUser = useStore(state => state.currentUser);
  const [formData, setFormData] = useState({
    surname: currentUser?.lastName || '',
    firstName: currentUser?.firstName || '',
    middleName: currentUser?.middleName || '',
    battalion: '',
    company: '',
    platoon: '',
    squad: '',
    trainingDays: Array.from({ length: 15 }, () => ({
      in: '',
      out: '',
      demerits: '',
      merits: ''
    }))
  });
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState('');
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddress(latitude, longitude);
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [location.longitude, location.latitude],
        zoom: 12
      });

      new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .addTo(map);

      return () => map.remove();
    }
  }, [location]);

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibWlyYW5mYW0tMTIzIiwiYSI6ImNtMnUwa3AwNjA5MTAyanB4aGtxNXlkanUifQ.oYbW0ZPDHKZ8_fwy7ilmyA`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setAddress(data.features[0].place_name);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };

  const handleTimeChange = (e, index, field) => {
    const newTrainingDays = [...formData.trainingDays];
    newTrainingDays[index][field] = e.target.value;
    setFormData({ ...formData, trainingDays: newTrainingDays });
  };

  const handleInputChange = (e, index, field) => {
    const newTrainingDays = [...formData.trainingDays];
    newTrainingDays[index][field] = e.target.value;
    setFormData({ ...formData, trainingDays: newTrainingDays });
  };

  const handleSubmit = e => {
    e.preventDefault();
    for (const [index, day] of formData.trainingDays.entries()) {
      if (day.in && day.out && day.in >= day.out) {
        alert(
          `Error on day ${
            index + 1
          }: "Out" time must be greater than "In" time.`
        );
        return;
      }
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-8 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-8">Attendance Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Surname"
              value={formData.surname}
              onChange={e =>
                setFormData({ ...formData, surname: e.target.value })
              }
            />
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={e =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <Input
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={e =>
                setFormData({ ...formData, middleName: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Battalion"
              value={formData.battalion}
              onChange={e =>
                setFormData({ ...formData, battalion: e.target.value })
              }
            />
            <Input
              placeholder="Company"
              value={formData.company}
              onChange={e =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
            <Input
              placeholder="Platoon"
              value={formData.platoon}
              onChange={e =>
                setFormData({ ...formData, platoon: e.target.value })
              }
            />
            <Input
              placeholder="Squad"
              value={formData.squad}
              onChange={e =>
                setFormData({ ...formData, squad: e.target.value })
              }
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Training Day</th>
                  {Array.from({ length: 15 }, (_, i) => {
                    const number = i + 1;
                    let suffix = 'th';
                    if (number === 1) suffix = 'st';
                    else if (number === 2) suffix = 'nd';
                    else if (number === 3) suffix = 'rd';
                    return (
                      <th key={i} className="py-2">{`${number}${suffix}`}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {['in', 'out'].map(field => (
                  <tr key={field}>
                    <td className="py-2 font-bold">{field.toUpperCase()}</td>
                    {formData.trainingDays.map((day, index) => (
                      <td key={index} className="py-2">
                        <input
                          type="time"
                          value={day[field]}
                          onChange={e => handleTimeChange(e, index, field)}
                          className="border rounded p-1"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                {['demerits', 'merits'].map(field => (
                  <tr key={field}>
                    <td className="py-2 font-bold">{field.toUpperCase()}</td>
                    {formData.trainingDays.map((day, index) => (
                      <td key={index} className="py-2">
                        <Input
                          value={day[field]}
                          onChange={e => handleInputChange(e, index, field)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button type="submit" className="mt-4 bg-olive hover:bg-olive/90">
            Submit
          </Button>
        </form>
        <div className="mt-4">
          <Alert className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <AlertTitle className="text-lg font-semibold">
                  Current Location
                </AlertTitle>
                <AlertDescription className="mt-1 text-sm">
                  {location.latitude && location.longitude ? (
                    <div>
                      <p>Latitude: {location.latitude}</p>
                      <p>Longitude: {location.longitude}</p>
                      <p>Address: {address}</p>
                    </div>
                  ) : (
                    <p>Loading location...</p>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>
          <div ref={mapContainerRef} className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
