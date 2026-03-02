
import os

# Project root
PROJECT_ROOT = "coin-global"
APP_DIR = "app"

# Route groups accessible to non-signed-in users
PUBLIC_GROUPS = ["(auth)", "(public)"]

accessible_routes = ["/"]


def extract_public_routes():
    if not os.path.exists(APP_DIR):
        print("app/ directory not found")
        return

    for group in os.listdir(APP_DIR):
        group_path = os.path.join(APP_DIR, group)

        # Check if it's a route group and is in allowed list
        if (
            os.path.isdir(group_path)
            and group.startswith("(")
            and group.endswith(")")
            and group in PUBLIC_GROUPS
        ):
            # Go through routes inside the group
            for route in os.listdir(group_path):
                route_path = os.path.join(group_path, route)

                if os.path.isdir(route_path):
                    # Skip special Next.js folders like _components etc if needed
                    if not route.startswith("_"):
                        accessible_routes.append(f"/{route}")

    return accessible_routes


def extract_protected_routes():
  protected_routes = []

  if not os.path.exists(APP_DIR):
    print("app/ directory not found")
    return protected_routes

  def has_page_file(directory):
    """Check if folder contains page.tsx or page.jsx"""
    return any(
        file in {"page.tsx", "page.jsx"}
        for file in os.listdir(directory)
    )

  def scan_directory(current_path, base_url=""):
    for item in os.listdir(current_path):
      item_path = os.path.join(current_path, item)

        # Skip non-directories
      if not os.path.isdir(item_path):
        continue

      # Skip public route groups
      if (
        item.startswith("(")
        and item.endswith(")")
        and item in PUBLIC_GROUPS
      ):
        continue

      # Skip private/system folders
      if item.startswith("_"):
        continue

      # If it's another route group (e.g. (protected)), traverse inside
      if item.startswith("(") and item.endswith(")"):
        scan_directory(item_path, base_url)
        continue

      # Build route path
      route_path = f"{base_url}/{item}"

      # Only add route if it contains page.tsx or page.jsx
      if has_page_file(item_path):
        protected_routes.append(route_path)

      # Continue scanning for nested routes
      scan_directory(item_path, route_path)

  scan_directory(APP_DIR)

  return protected_routes

if __name__ == "__main__":
  public = extract_public_routes()
  protected = extract_protected_routes()

  # Remove duplicates and sort
  public = sorted(list(set(public)))
  protected = sorted(list(set(protected)))

  output_path = os.path.join("lib", "generated")
  os.makedirs(output_path, exist_ok=True)

  file_path = os.path.join(output_path, "routes.ts")

  with open(file_path, "w", encoding="utf-8") as f:
    f.write("// ⚠️ AUTO-GENERATED FILE - DO NOT EDIT\n\n")
    f.write("export const publicRoutes = ")
    f.write(str(public).replace("'", '"'))
    f.write(" as const;\n\n")

    f.write("export const protectedRoutes = ")
    f.write(str(protected).replace("'", '"'))
    f.write(" as const;\n")

  print("✅ routes.ts generated successfully.")
