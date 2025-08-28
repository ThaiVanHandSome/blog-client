# Chức Năng Comment cho Blog

## Tổng Quan

Đã thêm chức năng comment hoàn chỉnh cho blog website, bao gồm:

- Thêm comment mới
- Hiển thị danh sách comment
- Chỉnh sửa comment (cho chủ comment)
- Xóa comment (cho chủ comment)

## Các Component Đã Tạo

### 1. CommentForm.tsx

- Form để người dùng nhập và gửi comment
- Kiểm tra đăng nhập trước khi cho phép comment
- Hiển thị avatar và tên người dùng
- Validation và error handling

### 2. CommentList.tsx

- Hiển thị danh sách tất cả comment của blog
- Hỗ trợ chỉnh sửa và xóa comment
- Loading state và empty state
- Format thời gian comment

### 3. CommentSection.tsx

- Wrapper component để quản lý state
- Kết hợp CommentForm và CommentList
- Xử lý refresh khi có comment mới

### 4. CommentDemo.tsx

- Component demo để test chức năng comment
- Có thể truy cập tại `/comment-demo`

## API Endpoints

### Comment API

- `POST /comments` - Tạo comment mới
- `GET /comments/blog/:blogId` - Lấy comment theo blog ID
- `PUT /comments/:commentId` - Cập nhật comment
- `DELETE /comments/:commentId` - Xóa comment

## Cách Sử Dụng

### 1. Trong Blog Detail Page

```tsx
import CommentSection from "@/components/CommentSection";

// Trong component
<CommentSection blogId={blog._id} />;
```

### 2. Sử Dụng Riêng Lẻ

```tsx
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";

// Trong component
<CommentForm blogId={blogId} onCommentAdded={handleRefresh} />
<CommentList blogId={blogId} refreshTrigger={refreshTrigger} />
```

## Tính Năng

### ✅ Đã Hoàn Thành

- [x] Tạo comment mới
- [x] Hiển thị danh sách comment
- [x] Chỉnh sửa comment
- [x] Xóa comment
- [x] Authentication check
- [x] Loading states
- [x] Error handling
- [x] Toast notifications
- [x] Responsive design
- [x] TypeScript support

### 🔄 Cần Backend Support

- [ ] API endpoints cho comment
- [ ] Database schema cho comment
- [ ] Authentication middleware
- [ ] Rate limiting

## Cấu Trúc Database (Đề Xuất)

```typescript
interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Styling

Sử dụng Tailwind CSS với các class:

- `prose` cho nội dung blog
- `avatar` cho user avatars
- `button` cho các action buttons
- Responsive design với `md:` breakpoints

## Lưu Ý

1. Cần đăng nhập để comment
2. Chỉ có thể chỉnh sửa/xóa comment của chính mình
3. Comment được refresh tự động khi có thay đổi
4. Hỗ trợ đa ngôn ngữ (hiện tại là tiếng Việt)
5. Responsive design cho mobile và desktop
