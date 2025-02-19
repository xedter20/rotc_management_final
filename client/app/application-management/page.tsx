'use client';

import { useState, useEffect } from 'react';
import { applicationService } from '@/services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  ArrowUpDown
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

export default function ApplicationManagementPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'studentNo',
    direction: 'asc'
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await applicationService.getAllApplications();
      setApplications(data);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleStatusUpdate = async (
    id: string,
    status: 'approved' | 'rejected'
  ) => {
    try {
      await applicationService.updateApplicationStatus(id, status);
      toast.success(`Application ${status} successfully`);
      loadApplications();
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setIsViewModalOpen(true);
  };

  const filteredApplications = applications
    .filter((app: any) =>
      Object.values(app).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Application Management</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('studentNo')}>
                <div className="flex items-center">
                  Student No.
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedApplications.map((app: any) => (
              <TableRow
                key={app.id}
                className="hover:bg-gray-50 transition-colors">
                <TableCell>{app.studentNo}</TableCell>
                <TableCell>
                  {app.firstName} {app.lastName}
                </TableCell>
                <TableCell>{app.course}</TableCell>
                <TableCell>
                  <Badge
                    className="uppercase"
                    variant={
                      app.status === 'approved'
                        ? 'default'
                        : app.status === 'rejected'
                        ? 'destructive'
                        : 'secondary'
                    }>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewApplication(app)}
                      className="hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(app.id, 'approved')}
                      disabled={app.status === 'approved'}
                      className="bg-olive hover:bg-olive/90">
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate(app.id, 'rejected')}
                      disabled={app.status === 'rejected'}
                      className="bg-red-700 hover:bg-red-600">
                      <X className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of{' '}
          {filteredApplications.length} applications
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="hover:bg-gray-100">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(90vh-100px)]">
            {selectedApplication && (
              <div className="space-y-8 p-4">
                <header className="max-w-4xl mx-auto space-y-4">
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
                        <p className="text-sm font-semibold uppercase">
                          Headquarters
                        </p>
                        <h1 className="text-base font-bold">
                          CENTRAL BICOL STATE UNIVERSITY OF AGRICULTURE –
                          SIPOCOT ROTC UNIT
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
                </header>

                {/* Profile Picture */}
                <div className="flex justify-end">
                  {selectedApplication.profilePicture && (
                    <div className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${selectedApplication.profilePicture}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Application Form Fields */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Student No.
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.studentNo}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">MS</label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.ms}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">Date</label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.date}
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        First Name
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.firstName}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Middle Name
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.middleName}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">Last Name</label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.lastName}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">Course</label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.course}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Date of Birth
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.dateOfBirth}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Place of Birth
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.placeOfBirth}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">Religion</label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.religion}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-field">
                      <label className="text-sm font-semibold">Address</label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.barangay},{' '}
                        {selectedApplication.city},{' '}
                        {selectedApplication.province}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Phone Number
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.phoneNumber}
                      </div>
                    </div>
                  </div>

                  {/* Physical Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-field">
                      <label className="text-sm font-semibold">Height</label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.height}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">Weight</label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.weight}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Blood Type
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.bloodType}
                      </div>
                    </div>
                  </div>

                  {/* Family Background */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Father's Name
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.father}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Father's Occupation
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.fatherOccupation}
                      </div>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="text-sm font-semibold">
                      Mother's Name
                    </label>
                    <div className="p-2 bg-gray-50 rounded border">
                      {selectedApplication.mother}
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="text-sm font-semibold">
                      Mother's Occupation
                    </label>
                    <div className="p-2 bg-gray-50 rounded border">
                      {selectedApplication.motherOccupation}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Emergency Contact Name
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.emergencyContact}
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Emergency Contact Relationship
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.emergencyRelationship}
                      </div>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="text-sm font-semibold">
                      Emergency Contact Address
                    </label>
                    <div className="p-2 bg-gray-50 rounded border">
                      {selectedApplication.emergencyAddress}
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="text-sm font-semibold">
                      Emergency Contact Phone
                    </label>
                    <div className="p-2 bg-gray-50 rounded border">
                      {selectedApplication.emergencyPhone}
                    </div>
                  </div>

                  {/* Military Science and Advancement */}
                  <div className="space-y-4">
                    <div className="form-field">
                      <label className="text-sm font-semibold">
                        Military Science Completed
                      </label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedApplication.militaryScience}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border rounded flex items-center justify-center">
                        {selectedApplication.willingToAdvance && '✓'}
                      </div>
                      <span className="text-sm">
                        Willing to take the advance course
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
