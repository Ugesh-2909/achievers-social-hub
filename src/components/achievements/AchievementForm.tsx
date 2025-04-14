
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Achievement, achievements } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const achievementSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.enum(["academic", "extracurricular", "professional", "volunteer", "award"]),
});

type AchievementFormData = z.infer<typeof achievementSchema>;

interface AchievementFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AchievementForm = ({ onSuccess, onCancel }: AchievementFormProps) => {
  const { user } = useAuth();
  const form = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "academic",
    },
  });

  const onSubmit = (data: AchievementFormData) => {
    if (!user) {
      toast.error("You must be logged in to post an achievement");
      return;
    }

    // Create a new achievement
    const newAchievement: Achievement = {
      id: `${achievements.length + 1}`,
      userId: user.id,
      title: data.title,
      description: data.description,
      category: data.category,
      image: `/images/achievements/${data.category}.svg`, // Use a default image based on category
      points: 100, // Default points
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
    };

    // In a real app, this would be an API call to save the achievement
    achievements.push(newAchievement);

    toast.success("Achievement posted successfully!");
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Achievement Title</FormLabel>
              <FormControl>
                <Input placeholder="What did you achieve?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your achievement..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="extracurricular">Extracurricular</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                  <SelectItem value="award">Award</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">Post Achievement</Button>
        </div>
      </form>
    </Form>
  );
};

export default AchievementForm;
