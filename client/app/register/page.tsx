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
import { userService } from '@/services/api';
import { toast } from 'sonner';

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'First Name must be at least 2 characters' }),
    middleName: z
      .string()
      .min(2, { message: 'Middle Name must be at least 2 characters' })
      .optional(),
    lastName: z
      .string()
      .min(2, { message: 'Last Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().min(10, { message: 'Invalid phone number' }),
    dateOfBirth: z.string(),
    gender: z.enum(['Male', 'Female', 'Other']),
    region: z.string().min(1, { message: 'Region is required' }),
    province: z.string().min(1, { message: 'Province is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    barangay: z.string().min(1, { message: 'Barangay is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
    agreeToTerms: z
      .boolean()
      .refine(val => val === true, { message: 'You must agree to terms' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const addUser = useStore(state => state.addUser);

  const [regionss, setRegions] = useState([]);
  const [provincess, setProvinces] = useState([]);
  const [citiess, setCities] = useState([]);
  const [barangayss, setBarangays] = useState([]);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: 'Male',
      region: '',
      province: '',
      city: '',
      barangay: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    }
  });

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

  async function handleSubmitForm(values: z.infer<typeof registerSchema>) {
    try {
      await userService.register(values);
      toast.success(
        'Registration successful. Please check your email to verify your account.'
      );
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      );
      setError(error instanceof Error ? error.message : 'Registration failed');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-olive mt-6 text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <Form {...form}>
          <>
            <form className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-full grid grid-cols-1 gap-6 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
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
                          placeholder="Middle Name"
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
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
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
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="col-span-full grid grid-cols-1 gap-6 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
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
                  name="gender"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={value => field.onChange(value)}>
                          <SelectTrigger
                            className={
                              fieldState.invalid ? 'border-red-500' : ''
                            }>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              </div>
              <div className="col-span-full grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Select
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
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
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
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        {...field}
                        className={fieldState.invalid ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="col-span-full flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm">
                  Show Password
                </label>
              </div>
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field, fieldState }) => (
                  <FormItem className="col-span-full">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        {...field}
                        className="mr-2"
                      />
                      <label htmlFor="agreeToTerms" className="text-sm">
                        I agree to the terms and conditions
                      </label>
                    </div>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              {error && (
                <p className="col-span-full text-xs text-red-500">{error}</p>
              )}
              <Button
                type="button"
                onClick={form.handleSubmit(handleSubmitForm)}
                className="col-span-full w-full
                 bg-olive hover:bg-olive">
                Sign up
              </Button>
            </form>
          </>
        </Form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-coyote font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
