# Use the official .NET 7 SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Copy the .csproj and restore dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the rest of the application code
COPY . .

# Build the application
RUN dotnet publish -c Release -o out

# Create the final image using a smaller runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/out .

# Set environment variables if needed
# ENV ASPNETCORE_ENVIRONMENT=Production

# Expose the port that your API will listen on
EXPOSE 80

# Start the application
ENTRYPOINT ["dotnet", "dotnet.dll"]