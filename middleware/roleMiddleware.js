// roleMiddleware.js

// Define role-based permissions
const rolePermissions = {
    admin: ['post_user', 'update_user', 'delete_user', 'create_user'], // admin permissions
    user: ['post_user', 'update_user', 'delete_recipe', 'update_recipe','post_recipe'], // user permissions
};

export const checkRole = (requiredPermissions) => {
    return (req, res, next) => {
        const { role } = req.user; // Assuming `req.user` is populated after JWT verification

        if (!role) {
            return res.status(401).json({ message: 'Unauthorized: Role not found' });
        }

        // Check if the user's role has any of the required permissions
        const permissions = rolePermissions[role];

        if (!permissions) {
            return res.status(403).json({ message: `Forbidden: Your role (${role}) does not have any permissions` });
        }

        // Check if any of the required permissions exist in the role's permissions
        const hasPermission = requiredPermissions.some(permission => permissions.includes(permission));

        if (!hasPermission) {
            return res.status(403).json({
                message: `Forbidden: Your role (${role}) does not have permission to perform any of the requested actions`,
            });
        }

        next(); // If the user has any of the required permissions, proceed to the next middleware or route handler
    };
};
