import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { handleApplicationSubmit } from '../mockData';
import { toast } from 'sonner';

const ApplicationDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    academicLevel: '',
    graduationYear: '',
    fieldOfStudy: '',
    trackOfInterest: '',
    whyEchelon: '',
    relevantExperience: '',
    analyticalResponse: '',
    resume: null,
    workSample: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const result = handleApplicationSubmit(formData);
      if (result.success) {
        toast.success(result.message);
        setFormData({
          fullName: '',
          email: '',
          institution: '',
          academicLevel: '',
          graduationYear: '',
          fieldOfStudy: '',
          trackOfInterest: '',
          whyEchelon: '',
          relevantExperience: '',
          analyticalResponse: '',
          resume: null,
          workSample: null
        });
        onClose();
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="application-dialog-final">
        <DialogHeader>
          <DialogTitle className="dialog-title">Apply to Echelon</DialogTitle>
          <DialogDescription className="dialog-description">
            Acceptance is earned. Applications are evaluated on clarity of thinking, attention to detail, and ability to execute.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="application-form-final">
          {/* Full Name */}
          <div className="form-group">
            <Label htmlFor="fullName" className="form-label">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Email Address */}
          <div className="form-group">
            <Label htmlFor="email" className="form-label">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Current Institution */}
          <div className="form-group">
            <Label htmlFor="institution" className="form-label">School / University</Label>
            <Input
              id="institution"
              name="institution"
              type="text"
              placeholder="Enter your high school or university"
              value={formData.institution}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Academic Level */}
          <div className="form-group">
            <Label htmlFor="academicLevel" className="form-label">Academic Level</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('academicLevel', value)}
              value={formData.academicLevel}
              required
            >
              <SelectTrigger className="form-select">
                <SelectValue placeholder="Select your academic level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Graduation Year */}
          <div className="form-group">
            <Label htmlFor="graduationYear" className="form-label">Graduation Year</Label>
            <Input
              id="graduationYear"
              name="graduationYear"
              type="text"
              placeholder="e.g., 2026"
              value={formData.graduationYear}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Field of Study / Academic Focus */}
          <div className="form-group">
            <Label htmlFor="fieldOfStudy" className="form-label">Field of Study / Academic Focus</Label>
            <Input
              id="fieldOfStudy"
              name="fieldOfStudy"
              type="text"
              placeholder="e.g., Finance, Economics, Mathematics, STEM, Business"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Track of Interest */}
          <div className="form-group">
            <Label htmlFor="trackOfInterest" className="form-label">Track of Interest</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('trackOfInterest', value)}
              value={formData.trackOfInterest}
              required
            >
              <SelectTrigger className="form-select">
                <SelectValue placeholder="Select a track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical-analysis">Technical Analysis</SelectItem>
                <SelectItem value="equity-research">Equity Research</SelectItem>
                <SelectItem value="macro-policy">Macro Policy</SelectItem>
                <SelectItem value="pr-marketing">PR / Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Why Echelon */}
          <div className="form-group">
            <Label htmlFor="whyEchelon" className="form-label">Why Echelon</Label>
            <Textarea
              id="whyEchelon"
              name="whyEchelon"
              placeholder="What draws you to Echelon? What do you intend to demonstrate through your work?"
              value={formData.whyEchelon}
              onChange={handleChange}
              required
              className="form-textarea"
              rows={5}
            />
          </div>

          {/* Analytical Question (NEW) */}
          <div className="form-group">
            <Label htmlFor="analyticalResponse" className="form-label">
              Short Response (Optional)
            </Label>
            <Textarea
              id="analyticalResponse"
              name="analyticalResponse"
              placeholder="Describe a company, trend, or idea you find interesting and why."
              value={formData.analyticalResponse}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
            />
          </div>

          {/* Relevant Experience (Optional) */}
          <div className="form-group">
            <Label htmlFor="relevantExperience" className="form-label">
              Relevant Experience (Optional)
            </Label>
            <Textarea
              id="relevantExperience"
              name="relevantExperience"
              placeholder="Include any relevant experience (coursework, personal projects, competitions, research, or internships). Prior experience is not required."
              value={formData.relevantExperience}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
            />
          </div>

          {/* Resume / CV Upload */}
          <div className="form-group">
            <Label htmlFor="resume" className="form-label">Resume / CV (Optional)</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="form-input"
            />
            <p className="form-helper-text">
              Upload a PDF if available. You may apply without one.
            </p>
          </div>

          {/* Work Sample Upload */}
          <div className="form-group">
            <Label htmlFor="workSample" className="form-label">
              Work Sample (Optional, Highly Recommended)
            </Label>
            <Input
              id="workSample"
              name="workSample"
              type="file"
              accept=".pdf,.xlsx,.xls,.doc,.docx"
              onChange={handleFileChange}
              className="form-input"
            />
            <p className="form-helper-text">
              Submit any model, analysis, writing sample, or project that reflects your thinking.
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="form-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>

          {/* Footer Note */}
          <div className="application-footer-note">
            <p>
              Echelon is open to both high school and university-level applicants.
              Prior experience is not a prerequisite.
              Selection is based on demonstrated potential and ability to meet the standard.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
