import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

const API_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");

const roleOptions = [
  "Investment Team: Equity Research Analyst",
  "Investment Team: Technical Analyst",
  "Investment Team: Macro Policy Analyst",
  "Leadership",
  "Fundraising",
  "Marketing / Content",
];

function formatApiErrorDetail(detail) {
  if (detail == null) return null;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => (item && typeof item === "object" && item.msg ? item.msg : JSON.stringify(item)))
      .join("; ");
  }
  if (typeof detail === "object") return JSON.stringify(detail);
  return String(detail);
}

const Apply = () => {
  const navigate = useNavigate();
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
      // Validate file size (10MB limit)
      if (files[0].size > 10 * 1024 * 1024) {
        toast.error(`${files[0].name} exceeds 10MB limit`);
        return;
      }
      
      // Validate resume is PDF
      if (name === 'resume' && files[0].type !== 'application/pdf') {
        toast.error('Resume must be a PDF file');
        return;
      }
      
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData for multipart upload
      const submitData = new FormData();
      
      // Add form fields (matching backend parameter names)
      submitData.append('full_name', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('institution', formData.institution);
      submitData.append('academic_level', formData.academicLevel);
      submitData.append('graduation_year', formData.graduationYear);
      submitData.append('field_of_study', formData.fieldOfStudy);
      submitData.append('track_of_interest', formData.trackOfInterest);
      submitData.append('why_echelon', formData.whyEchelon);
      
      // Add optional fields only if they have values
      if (formData.relevantExperience) {
        submitData.append('relevant_experience', formData.relevantExperience);
      }
      if (formData.analyticalResponse) {
        submitData.append('analytical_response', formData.analyticalResponse);
      }
      
      // Add files
      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }
      if (formData.workSample) {
        submitData.append('work_sample', formData.workSample);
      }
      
      // Submit to backend
      const response = await fetch(`${API_URL}/api/applications/submit`, {
        method: 'POST',
        body: submitData,
        // Don't set Content-Type - browser will set it with boundary
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        toast.error("Invalid server response. Please try again.");
        return;
      }

      if (response.ok && result.success) {
        toast.success('Application submitted successfully! We will review your application and be in touch.');
        
        // Reset form
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
        
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = '');
        
        // Redirect to home after 2 seconds
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(
          formatApiErrorDetail(result.detail) || "Application submission failed. Please try again."
        );
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-page page-shell-final page-shell-padded-final">
      <div className="content-container-final page-shell-narrow-final">
        <div className="page-heading-final">
          <h1 className="section-title-final">Apply to Echelon Equity</h1>
          <p className="section-subtitle-final">
            Applications are open for investment research and selected operating roles. Selection is based on judgment, communication quality, and reliable execution.
          </p>
        </div>

        <section className="content-section-final" style={{ paddingTop: 0 }}>
          <h2 className="section-title-final" style={{ fontSize: '1.55rem', marginBottom: '1rem' }}>Application Process</h2>
          <div className="content-grid-final">
            <article className="content-card-final">
              <h3 className="content-card-title-final">1. Submit your materials</h3>
              <p className="content-card-copy-final">
                Complete the form with concise, specific responses. Resume upload is required for full review.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">2. Role-fit review</h3>
              <p className="content-card-copy-final">
                Applications are screened for role fit, analytical maturity, writing clarity, and commitment to standards.
              </p>
            </article>
            <article className="content-card-final">
              <h3 className="content-card-title-final">3. Team decision</h3>
              <p className="content-card-copy-final">
                Final decisions prioritize candidates who can produce high-signal work consistently in a feedback-driven environment.
              </p>
            </article>
          </div>
          <p className="positioning-paragraph-final" style={{ marginTop: '1rem' }}>
            Before applying, review the <Link to="/program" className="inline-link-final">investment research program</Link> and <Link to="/portfolio" className="inline-link-final">research portfolio</Link> to understand role expectations.
          </p>
        </section>
        
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

          {/* Role of Interest */}
          <div className="form-group">
            <Label htmlFor="trackOfInterest" className="form-label">Role of Interest</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('trackOfInterest', value)}
              value={formData.trackOfInterest}
              required
            >
              <SelectTrigger className="form-select">
                <SelectValue placeholder="Select the role you are applying for" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
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

          {/* Analytical Question */}
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

          {/* Relevant Experience */}
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
            {formData.resume && (
              <p className="form-helper-text" style={{ color: '#000', marginTop: '0.5rem' }}>
                ✓ {formData.resume.name}
              </p>
            )}
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
            {formData.workSample && (
              <p className="form-helper-text" style={{ color: '#000', marginTop: '0.5rem' }}>
                ✓ {formData.workSample.name}
              </p>
            )}
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
              Echelon reviews applicants across research and operating roles.
              Prior experience is not a prerequisite.
              Selection is based on judgment, communication, and ability to meet the standard.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
