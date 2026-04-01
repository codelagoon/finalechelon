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
import { handleApplicationSubmit } from '../mockData';
import { toast } from 'sonner';

const ApplicationDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    major: '',
    gradYear: '',
    whyEchelon: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const result = handleApplicationSubmit(formData);
      if (result.success) {
        toast.success(result.message);
        setFormData({ 
          name: '', 
          email: '', 
          university: '', 
          major: '', 
          gradYear: '', 
          whyEchelon: '', 
          experience: '' 
        });
        onClose();
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="application-dialog">
        <DialogHeader>
          <DialogTitle className="dialog-title">Apply to Echelon</DialogTitle>
          <DialogDescription className="dialog-description">
            Acceptance is earned. Complete the form below and we'll review your application carefully.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <Label htmlFor="name" className="form-label">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <Label htmlFor="email" className="form-label">Email</Label>
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
          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="university" className="form-label">University</Label>
              <Input
                id="university"
                name="university"
                type="text"
                placeholder="Your university"
                value={formData.university}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <Label htmlFor="gradYear" className="form-label">Grad Year</Label>
              <Input
                id="gradYear"
                name="gradYear"
                type="text"
                placeholder="2026"
                value={formData.gradYear}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <Label htmlFor="major" className="form-label">Major / Field of Study</Label>
            <Input
              id="major"
              name="major"
              type="text"
              placeholder="e.g., Finance, Economics, Computer Science"
              value={formData.major}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <Label htmlFor="whyEchelon" className="form-label">Why Echelon?</Label>
            <Textarea
              id="whyEchelon"
              name="whyEchelon"
              placeholder="What draws you to Echelon? What do you hope to prove?"
              value={formData.whyEchelon}
              onChange={handleChange}
              required
              className="form-textarea"
              rows={4}
            />
          </div>
          <div className="form-group">
            <Label htmlFor="experience" className="form-label">Relevant Experience</Label>
            <Textarea
              id="experience"
              name="experience"
              placeholder="Any finance, modeling, or analytical experience (internships, coursework, personal projects)"
              value={formData.experience}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
            />
          </div>
          <Button 
            type="submit" 
            className="form-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
