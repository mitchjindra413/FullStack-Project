json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :bio, :created_at, :updated_at
end