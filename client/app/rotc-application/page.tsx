'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/mock-data';
import {
  regions,
  provinces,
  cities,
  barangays,
  regionByCode,
  provincesByCode,
  provinceByName
} from 'select-philippines-address';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { userService, applicationService, API_URL } from '@/services/api';
import { toast } from 'sonner';
import { MainNav } from '@/components/main-nav';
import Image from 'next/image';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const schema = z.object({
  studentNo: z.string().min(1, 'Student No. is required'),
  ms: z.string().min(1, 'MS is required'),
  date: z.string().min(1, 'Date is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  firstName: z.string().min(1, 'First Name is required'),
  middleName: z.string().optional(),
  //address: z.string().min(1, 'Address is required'),
  region: z.string().min(1, { message: 'Region is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  barangay: z.string().min(1, { message: 'Barangay is required' }),
  phoneNumber: z.string().optional(),

  course: z.string().min(1, 'Course is required'),
  school: z.string().min(1, 'School is required'),
  religion: z.string().min(1, 'Religion is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  placeOfBirth: z.string().min(1, 'Place of Birth is required'),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  complexion: z.string().min(1, 'Complexion is required'),
  bloodType: z.string().min(1, 'Blood Type is required'),
  father: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  mother: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
  emergencyRelationship: z
    .string()
    .min(1, 'Emergency relationship is required'),
  emergencyAddress: z.string().min(1, 'Emergency address is required'),
  emergencyPhone: z.string().min(1, 'Emergency phone is required'),
  militaryScience: z.string().optional(),
  willingToAdvance: z.boolean()
});

export default function ROTCApplicationPage() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const addUser = useStore(state => state.addUser);
  const currentUser = useStore(state => state.currentUser);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(
    null
  );

  const [regionss, setRegions] = useState([]);
  const [provincess, setProvinces] = useState([]);
  const [citiess, setCities] = useState([]);
  const [barangayss, setBarangays] = useState([]);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [existingApplication, setExistingApplication] = useState(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageFile(file);

      const url = URL.createObjectURL(file);

      setImageUrl(url);
    }
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      studentNo: '',
      ms: '',
      date: new Date().toISOString().split('T')[0], // Today's date
      lastName: currentUser?.lastName || '',
      firstName: currentUser?.firstName || '',
      middleName: currentUser?.middleName || '',
      region: currentUser?.region || '',
      province: currentUser?.province || '',
      city: currentUser?.city || '',
      barangay: currentUser?.barangay || '',
      phoneNumber: currentUser?.phoneNumber || '',
      course: currentUser?.course || '',
      school: '',
      religion: '',
      dateOfBirth: currentUser?.dateOfBirth || '',
      placeOfBirth: '',
      height: '',
      weight: '',
      complexion: '',
      bloodType: '',
      father: '',
      fatherOccupation: '',
      mother: '',
      motherOccupation: '',
      emergencyContact: '',
      emergencyRelationship: '',
      emergencyAddress: '',
      emergencyPhone: '',
      militaryScience: '',
      willingToAdvance: false
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form;

  useEffect(() => {
    regions().then(setRegions);
  }, []);

  const handleRegionChange = (regionCode: string) => {
    provinces(regionCode).then(setProvinces);
    setCities([]);
    setBarangays([]);
  };

  const handleProvinceChange = (provinceCode: string) => {
    cities(provinceCode).then(setCities);
    setBarangays([]);
  };

  const handleCityChange = (cityCode: string) => {
    barangays(cityCode).then(setBarangays);
  };

  useEffect(() => {
    if (currentUser?.region) {
      // Load provinces for the user's region
      provinces(currentUser.region).then(provinceList => {
        setProvinces(provinceList);
      });
    }
  }, [currentUser?.region]);

  useEffect(() => {
    if (currentUser?.province) {
      // Load cities for the user's province
      cities(currentUser.province).then(cityList => {
        setCities(cityList);
      });
    }
  }, [currentUser?.province]);

  useEffect(() => {
    if (currentUser?.city) {
      // Load barangays for the user's city
      barangays(currentUser.city).then(barangayList => {
        setBarangays(barangayList);
      });
    }
  }, [currentUser?.city]);

  useEffect(() => {
    if (currentUser) {
      form.reset({
        ...form.getValues(),
        lastName: currentUser.lastName,
        firstName: currentUser.firstName,
        middleName: currentUser.middleName || '',
        region: currentUser.region,
        province: currentUser.province,
        city: currentUser.city,
        barangay: currentUser.barangay,
        phoneNumber: currentUser.phoneNumber || '',
        course: currentUser.course || '',
        dateOfBirth: currentUser.dateOfBirth
      });

      // Trigger loading of address dependencies
      if (currentUser.region) handleRegionChange(currentUser.region);
      if (currentUser.province) handleProvinceChange(currentUser.province);
      if (currentUser.city) handleCityChange(currentUser.city);
    }
  }, [currentUser, form]);

  useEffect(() => {
    if (currentUser?.id) {
      applicationService
        .getUserApplication(currentUser.id)
        .then(application => {
          if (application) {
            setApplicationStatus(application.status);
            setExistingApplication(application);

            // Update form with existing application data
            form.reset({
              studentNo: application.studentNo,
              ms: application.ms,
              lastName: application.lastName,
              firstName: application.firstName,
              middleName: application.middleName || '',
              region: application.region,
              province: application.province,
              city: application.city,
              barangay: application.barangay,
              phoneNumber: application.phoneNumber,
              course: application.course,
              school: application.school,
              religion: application.religion,
              dateOfBirth: application.dateOfBirth,
              placeOfBirth: application.placeOfBirth,
              height: application.height,
              weight: application.weight,
              complexion: application.complexion,
              bloodType: application.bloodType,
              father: application.father,
              fatherOccupation: application.fatherOccupation,
              mother: application.mother,
              motherOccupation: application.motherOccupation,
              emergencyContact: application.emergencyContact,
              emergencyRelationship: application.emergencyRelationship,
              emergencyAddress: application.emergencyAddress,
              emergencyPhone: application.emergencyPhone,
              militaryScience: application.militaryScience || '',
              willingToAdvance: application.willingToAdvance
            });

            // If there's a profile picture, set it with the correct path
            if (application.profilePicture) {
              const imageUrl = application.profilePicture.replace(/\\/g, '/');
              setImageUrl(`${API_URL}/uploads/${imageUrl}`);
            }
          }
        })
        .catch(error => {
          console.error('Error fetching application:', error);
          toast.error('Failed to fetch application details');
        });
    }
  }, [currentUser, form]);

  const handleSubmitForm = async (data: z.infer<typeof schema>) => {
    try {
      const applicationData = {
        ...data,
        profilePicture: imageFile,
        userId: currentUser?.id
      };

      if (existingApplication) {
        await applicationService.updateApplication(
          existingApplication.id,
          applicationData
        );
        toast.success('Application updated successfully');
      } else {
        await applicationService.submitApplication(applicationData);
        toast.success('Application submitted successfully');
      }

      // router.push('/dashboard');
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to submit application'
      );
    }
  };

  console.log({ errors });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 border-green-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-8 rounded-lg bg-white p-8 shadow-md">
        {applicationStatus && (
          <Alert className={`mb-6 ${getStatusColor(applicationStatus)}`}>
            <div className="flex items-center gap-3">
              {getStatusIcon(applicationStatus)}
              <div className="flex-1">
                <AlertTitle className="text-lg font-semibold">
                  Application Status:{' '}
                  <Badge
                    variant="outline"
                    className={`ml-2 ${
                      applicationStatus === 'approved'
                        ? 'border-green-500 text-green-700'
                        : applicationStatus === 'rejected'
                        ? 'border-red-500 text-red-700'
                        : 'border-yellow-500 text-yellow-700'
                    }`}>
                    {applicationStatus.charAt(0).toUpperCase() +
                      applicationStatus.slice(1)}
                  </Badge>
                </AlertTitle>
                <AlertDescription className="mt-1 text-sm">
                  {applicationStatus === 'approved'
                    ? 'Congratulations! Your ROTC application has been approved.'
                    : applicationStatus === 'rejected'
                    ? 'Unfortunately, your ROTC application has been rejected.'
                    : 'Your ROTC application is currently under review.'}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <header className="max-w-4xl mx-auto p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left logos */}
            <div className="flex gap-2 min-w-24">
              <div className="relative w-12 h-12">
                <Image
                  src="https://s3-alpha-sig.figma.com/img/78f6/87f1/249a5157e9c08e91f6d81081a64c6e86?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=N3z4d3fmUrIhn9pC5WSMEum6VmfmvoF1HflcmJfpzOMzeYxTdvMrqwTvQf8nRQuo1Y03Nuk5Q9KZjcB4AW4-IDdR6i6672RNpbCkKEPDiNZNZYalpiku0GdeCJkzKyyF3RI6fIL~VkLs7dF01hwjAPHI8RN27iYhLQRQsyqYnaMC6pg9quHEIR7fCoCV3qI815TqE47wY8139sfSErh~yU7h1RWYz1pCex4FqG9eQfczHWJL5c5jpciRwOg2k-zgNfy3LaEDF4Vz7Rd88yHsFsMvMDlo5k0K-g-lbU3dSyKRVR9MK4Xo~MDrvIQxWJzy7JYrYGFRBBHkGWx89pCGAA__"
                  alt="Government logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="relative w-12 h-12">
                <Image
                  src="https://s3-alpha-sig.figma.com/img/78f6/87f1/249a5157e9c08e91f6d81081a64c6e86?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=N3z4d3fmUrIhn9pC5WSMEum6VmfmvoF1HflcmJfpzOMzeYxTdvMrqwTvQf8nRQuo1Y03Nuk5Q9KZjcB4AW4-IDdR6i6672RNpbCkKEPDiNZNZYalpiku0GdeCJkzKyyF3RI6fIL~VkLs7dF01hwjAPHI8RN27iYhLQRQsyqYnaMC6pg9quHEIR7fCoCV3qI815TqE47wY8139sfSErh~yU7h1RWYz1pCex4FqG9eQfczHWJL5c5jpciRwOg2k-zgNfy3LaEDF4Vz7Rd88yHsFsMvMDlo5k0K-g-lbU3dSyKRVR9MK4Xo~MDrvIQxWJzy7JYrYGFRBBHkGWx89pCGAA__"
                  alt="University logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Center text */}
            <div className="flex-1">
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold uppercase">Headquarters</p>
                <h1 className="text-base font-bold">
                  CENTRAL BICOL STATE UNIVERSITY OF AGRICULTURE – SIPOCOT ROTC
                  UNIT
                </h1>
                <p className="text-sm font-medium">
                  DEPARTMENT OF MILITARY SCIENCE AND TACTICS
                </p>
                <p className="text-sm">
                  502<sup>ND</sup> (CAS) CDC, 5RCDG, RESCOM
                </p>
                <p className="text-sm">Impig, Sipocot, Camarines Sur</p>
              </div>
            </div>

            {/* Right logo */}
            <div className="min-w-12">
              <div className="relative w-12 h-12">
                <Image
                  src="https://s3-alpha-sig.figma.com/img/f548/3446/db384828b403832da6b1482d892e745c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=P070JUOkqszUbFuT2TNV9JoN2BiOQz5~wZ54ockwtHuiOAcVBuTblUOIc0mD~K~hd2seSIzgQawmeu58ZfxFBS3VEs0bTowZQQ3zgt3GaATMz7ATboVVGcAirwRWyXG7ByWk6Yn0rWA3juM1zlMjrWxFtVXchwSqrkJZgCaXOWHuQORixbKpiL-yttDIqM5c-nwOKXiPi9Y8IdCpJOuYj9jpQZdVnaK4P5K1bP3ACwzpz-HdT8Lk~zU87-eHML3EwKoNCEoWmc1dmbAAAyj2sj32ZapvtyWyO59BpVsUGgVr~nFcD35KIyym8-SchR5o8Mwib8bFZjOBIxkiPmtDxg__"
                  alt="ROTC Unit logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="text-center space-y-1 pt-4">
            <h2 className="text-lg font-bold underline">
              ROTC REGISTRATION FORM
            </h2>
            <p className="text-sm italic">(Print all entries)</p>
          </div>
        </header>
        <div className="flex text-center justify-end">
          <div
            className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden relative cursor-pointer"
            onClick={() => document.getElementById('profile-upload')?.click()}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-sm text-center px-2">
                  Click to upload profile picture
                </span>
              </div>
            )}
          </div>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          {/* <span className="text-sm text-gray-500 mt-2">2x2 ID Picture</span> */}
        </div>
        <Form {...form}>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="studentNo"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Student No.</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ms"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>MS</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="region"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={value => {
                          field.onChange(value);
                          handleRegionChange(value);
                        }}>
                        <SelectTrigger
                          className={
                            fieldState.invalid ? 'border-red-500' : ''
                          }>
                          <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {regionss.map(region => (
                              <SelectItem
                                key={region.region_code}
                                value={region.region_code}>
                                {region.region_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={currentUser.province}
                        onValueChange={value => {
                          field.onChange(value);
                          handleProvinceChange(value);
                        }}>
                        <SelectTrigger
                          className={
                            fieldState.invalid ? 'border-red-500' : ''
                          }>
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {provincess.map(province => (
                              <SelectItem
                                key={province.province_code}
                                value={province.province_code}>
                                {province.province_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={currentUser.city}
                        onValueChange={value => {
                          field.onChange(value);
                          handleCityChange(value);
                        }}>
                        <SelectTrigger
                          className={
                            fieldState.invalid ? 'border-red-500' : ''
                          }>
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {citiess.map(city => (
                              <SelectItem
                                key={city.city_code}
                                value={city.city_code}>
                                {city.city_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="barangay"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Barangay</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={currentUser.barangay}
                        onValueChange={value => {
                          field.onChange(value);
                        }}>
                        <SelectTrigger
                          className={
                            fieldState.invalid ? 'border-red-500' : ''
                          }>
                          <SelectValue placeholder="Select Barangay" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {barangayss.map(barangay => (
                              <SelectItem
                                key={barangay.brgy_code}
                                value={barangay.brgy_code}>
                                {barangay.brgy_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="course"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="school"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="religion"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Religion</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="placeOfBirth"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Place of Birth</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="complexion"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Complexion</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Blood Type</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="father"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Father</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fatherOccupation"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mother"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Mother</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motherOccupation"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyRelationship"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="emergencyAddress"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyPhone"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Telephone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="militaryScience"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Military Science Completed</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={fieldState.invalid ? 'border-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('willingToAdvance')}
                className="mr-2"
              />
              <label className="text-sm font-medium">
                Willing to take the advance course?
              </label>
            </div>

            <Button
              type="button"
              onClick={form.handleSubmit(handleSubmitForm)}
              className="w-full mt-4 bg-olive text-white py-2 px-4 rounded-md shadow-sm hover:bg-olive">
              {existingApplication
                ? 'Update Application'
                : 'Submit Application'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
