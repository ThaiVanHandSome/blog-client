# Comment Reply Feature

## Overview

This feature allows users to reply to existing comments, creating a threaded conversation structure.

## Features

- **Reply to Comments**: Users can reply to any top-level comment
- **Threaded Display**: Replies are displayed with proper indentation and visual hierarchy
- **Nested Structure**: Supports multiple levels of replies
- **User Authentication**: Only authenticated users can reply
- **Real-time Updates**: Replies appear immediately after posting

## Technical Implementation

### 1. Updated Types (`src/types/comment.type.ts`)

```typescript
export interface Comment {
  _id: string;
  content: string;
  like: number;
  user: User;
  blog: string;
  parentComment?: string; // ID of parent comment if this is a reply
  replies?: Comment[]; // Array of reply comments
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  content: string;
  blog: string;
  parentComment?: string; // Optional parent comment ID for replies
}

export interface ReplyRequest {
  content: string;
  blog: string;
  parentComment: string; // Required parent comment ID for replies
}
```

### 2. New Schema (`src/schemas/index.ts`)

```typescript
export const replySchema = z.object({
  content: z.string().max(1000, "Reply must be less than 1000 characters"),
});
export type ReplyInput = z.infer<typeof replySchema>;
```

### 3. ReplyForm Component (`src/components/comment/ReplyForm.tsx`)

- Dedicated form for creating replies
- Shows "Replying to [Username]" indicator
- Smaller avatar and form size for replies
- Cancel button to close reply form

### 4. Updated CommentList Component (`src/components/comment/CommentList.tsx`)

- Filters top-level comments (no parentComment)
- Renders replies with proper indentation
- Shows reply button for top-level comments only
- Integrates ReplyForm for creating replies
- Recursive rendering of nested replies

## Usage

### For Users

1. **View Comments**: Comments are displayed with reply buttons
2. **Reply to Comment**: Click the "Reply" button below any comment
3. **Write Reply**: Type your reply in the form that appears
4. **Submit**: Click "Reply" to post your response
5. **View Thread**: Replies appear indented below the parent comment

### For Developers

1. **API Integration**: Uses existing comment endpoints with `parentComment` field
2. **State Management**: Manages reply form visibility and comment editing
3. **Real-time Updates**: Automatically refreshes comment list after posting
4. **Responsive Design**: Adapts layout for different screen sizes

## API Endpoints

The feature uses the existing comment endpoints:

- `POST /comments` - Create comment or reply (include `parentComment` for replies)
- `GET /comments/blog/:blogId` - Get all comments for a blog (includes replies)
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

## Styling

- Replies are indented with `ml-12` class
- Smaller avatar size for replies (`h-8 w-8` vs `h-10 w-10`)
- Visual separator with left border for reply forms
- Consistent spacing and typography

## Future Enhancements

- **Deep Nesting**: Support for multiple levels of replies
- **Collapse/Expand**: Hide/show long reply threads
- **Reply Notifications**: Notify users when someone replies to their comment
- **Moderation**: Admin tools for managing reply threads
- **Rich Text**: Support for formatting in replies

## Testing

- Test reply creation for authenticated users
- Verify reply display and indentation
- Test reply editing and deletion
- Ensure proper user permission checks
- Test with multiple levels of replies
