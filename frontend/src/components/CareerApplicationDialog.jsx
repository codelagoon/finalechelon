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
import { handleCareerApplicationSubmit, careersData } from '../mockData';
import { toast } from 'sonner';

const CareerApplicationDialog = ({ isOpen, onClose, selectedRole }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: selectedRole || '',
    whyEchelon: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update role when selectedRole prop changes
  React.useEffect(() => {
    if (selectedRole) {
      setFormData(prev => ({ ...prev, role: selectedRole }));
    }
  }, [selectedRole]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const result = handleCareerApplicationSubmit(formData);
      if (result.success) {
        toast.success(result.message);
        setFormData({ name: '', email: '', role: '', whyEchelon: '' });
        onClose();
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="career-application-dialog">
        <DialogHeader>
          <DialogTitle className="dialog-title">Apply to Echelon</DialogTitle>
          <DialogDescription className="dialog-description">
            Join a team of exceptional individuals building the future of wealth management.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="career-application-form">
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
          <div className="form-group">
            <Label htmlFor="role" className="form-label">Role</Label>
            <Select onValueChange={handleRoleChange} value={formData.role} required>
              <SelectTrigger className="form-select">
                <SelectValue placeholder="Select role you're applying for" />
              </SelectTrigger>
              <SelectContent>
                {careersData.roles.map((role) => (
                  <SelectItem key={role.id} value={role.title}>
                    {role.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="form-group">
            <Label htmlFor="whyEchelon" className="form-label">Why Echelon?</Label>
            <Textarea
              id="whyEchelon"
              name="whyEchelon"
              placeholder="Tell us why you want to join Echelon and what makes you exceptional..."
              value={formData.whyEchelon}
              onChange={handleChange}
              required
              className="form-textarea"
              rows={5}
            />
          </div>
          <p className="resume-note">
            Resume upload: Please include a link to your resume/LinkedIn in your response above, or attach in follow-up email.
          </p>
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

export default CareerApplicationDialog;
