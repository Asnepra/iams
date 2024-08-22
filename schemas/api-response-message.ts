// httpStatus.ts

// Success
export const HTTP_OK = 200; // OK
export const HTTP_CREATED = 201; // Created
export const HTTP_ACCEPTED = 202; // Accepted
export const HTTP_NON_AUTHORITATIVE_INFORMATION = 203; // Non-Authoritative Information
export const HTTP_NO_CONTENT = 204; // No Content
export const HTTP_RESET_CONTENT = 205; // Reset Content
export const HTTP_PARTIAL_CONTENT = 206; // Partial Content

// Redirection
export const HTTP_MULTIPLE_CHOICES = 300; // Multiple Choices
export const HTTP_MOVED_PERMANENTLY = 301; // Moved Permanently
export const HTTP_FOUND = 302; // Found
export const HTTP_SEE_OTHER = 303; // See Other
export const HTTP_NOT_MODIFIED = 304; // Not Modified
export const HTTP_USE_PROXY = 305; // Use Proxy
export const HTTP_TEMPORARY_REDIRECT = 307; // Temporary Redirect
export const HTTP_PERMANENT_REDIRECT = 308; // Permanent Redirect

// Client Error
export const HTTP_BAD_REQUEST = 400; // Bad Request
export const HTTP_UNAUTHORIZED = 401; // Unauthorized
export const HTTP_PAYMENT_REQUIRED = 402; // Payment Required
export const HTTP_FORBIDDEN = 403; // Forbidden
export const HTTP_NOT_FOUND = 404; // Not Found
export const HTTP_METHOD_NOT_ALLOWED = 405; // Method Not Allowed
export const HTTP_NOT_ACCEPTABLE = 406; // Not Acceptable
export const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407; // Proxy Authentication Required
export const HTTP_REQUEST_TIMEOUT = 408; // Request Timeout
export const HTTP_CONFLICT = 409; // Conflict
export const HTTP_GONE = 410; // Gone
export const HTTP_LENGTH_REQUIRED = 411; // Length Required
export const HTTP_PRECONDITION_FAILED = 412; // Precondition Failed
export const HTTP_PAYLOAD_TOO_LARGE = 413; // Payload Too Large
export const HTTP_URI_TOO_LONG = 414; // URI Too Long
export const HTTP_UNSUPPORTED_MEDIA_TYPE = 415; // Unsupported Media Type
export const HTTP_RANGE_NOT_SATISFIABLE = 416; // Range Not Satisfiable
export const HTTP_EXPECTATION_FAILED = 417; // Expectation Failed
export const HTTP_IM_A_TEAPOT = 418; // I'm a teapot
export const HTTP_MISDIRECTED_REQUEST = 421; // Misdirected Request
export const HTTP_UNPROCESSABLE_ENTITY = 422; // Unprocessable Entity
export const HTTP_LOCKED = 423; // Locked
export const HTTP_FAILED_DEPENDENCY = 424; // Failed Dependency
export const HTTP_TOO_EARLY = 425; // Too Early
export const HTTP_UPGRADE_REQUIRED = 426; // Upgrade Required
export const HTTP_PRECONDITION_REQUIRED = 428; // Precondition Required
export const HTTP_TOO_MANY_REQUESTS = 429; // Too Many Requests
export const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431; // Request Header Fields Too Large
export const HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451; // Unavailable For Legal Reasons

// Server Error
export const HTTP_INTERNAL_SERVER_ERROR = 500; // Internal Server Error
export const HTTP_NOT_IMPLEMENTED = 501; // Not Implemented
export const HTTP_BAD_GATEWAY = 502; // Bad Gateway
export const HTTP_SERVICE_UNAVAILABLE = 503; // Service Unavailable
export const HTTP_GATEWAY_TIMEOUT = 504; // Gateway Timeout
export const HTTP_HTTP_VERSION_NOT_SUPPORTED = 505; // HTTP Version Not Supported
export const HTTP_VARIANT_ALSO_NEGOTIATES = 506; // Variant Also Negotiates
export const HTTP_INSUFFICIENT_STORAGE = 507; // Insufficient Storage
export const HTTP_LOOP_DETECTED = 508; // Loop Detected
export const HTTP_NOT_EXTENDED = 510; // Not Extended
export const HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511; // Network Authentication Required

// Status Messages
export const STATUS_MESSAGES: Record<number, string> = {
  [HTTP_OK]: "OK",
  [HTTP_CREATED]: "Created",
  [HTTP_ACCEPTED]: "Accepted",
  [HTTP_NON_AUTHORITATIVE_INFORMATION]: "Non-Authoritative Information",
  [HTTP_NO_CONTENT]: "No Content",
  [HTTP_RESET_CONTENT]: "Reset Content",
  [HTTP_PARTIAL_CONTENT]: "Partial Content",
  [HTTP_MULTIPLE_CHOICES]: "Multiple Choices",
  [HTTP_MOVED_PERMANENTLY]: "Moved Permanently",
  [HTTP_FOUND]: "Found",
  [HTTP_SEE_OTHER]: "See Other",
  [HTTP_NOT_MODIFIED]: "Not Modified",
  [HTTP_USE_PROXY]: "Use Proxy",
  [HTTP_TEMPORARY_REDIRECT]: "Temporary Redirect",
  [HTTP_PERMANENT_REDIRECT]: "Permanent Redirect",
  [HTTP_BAD_REQUEST]: "Bad Request",
  [HTTP_UNAUTHORIZED]: "Unauthorized",
  [HTTP_PAYMENT_REQUIRED]: "Payment Required",
  [HTTP_FORBIDDEN]: "Forbidden",
  [HTTP_NOT_FOUND]: "Not Found",
  [HTTP_METHOD_NOT_ALLOWED]: "Method Not Allowed",
  [HTTP_NOT_ACCEPTABLE]: "Not Acceptable",
  [HTTP_PROXY_AUTHENTICATION_REQUIRED]: "Proxy Authentication Required",
  [HTTP_REQUEST_TIMEOUT]: "Request Timeout",
  [HTTP_CONFLICT]: "Conflict",
  [HTTP_GONE]: "Gone",
  [HTTP_LENGTH_REQUIRED]: "Length Required",
  [HTTP_PRECONDITION_FAILED]: "Precondition Failed",
  [HTTP_PAYLOAD_TOO_LARGE]: "Payload Too Large",
  [HTTP_URI_TOO_LONG]: "URI Too Long",
  [HTTP_UNSUPPORTED_MEDIA_TYPE]: "Unsupported Media Type",
  [HTTP_RANGE_NOT_SATISFIABLE]: "Range Not Satisfiable",
  [HTTP_EXPECTATION_FAILED]: "Expectation Failed",
  [HTTP_IM_A_TEAPOT]: "I'm a teapot",
  [HTTP_MISDIRECTED_REQUEST]: "Misdirected Request",
  [HTTP_UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
  [HTTP_LOCKED]: "Locked",
  [HTTP_FAILED_DEPENDENCY]: "Failed Dependency",
  [HTTP_TOO_EARLY]: "Too Early",
  [HTTP_UPGRADE_REQUIRED]: "Upgrade Required",
  [HTTP_PRECONDITION_REQUIRED]: "Precondition Required",
  [HTTP_TOO_MANY_REQUESTS]: "Too Many Requests",
  [HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE]: "Request Header Fields Too Large",
  [HTTP_UNAVAILABLE_FOR_LEGAL_REASONS]: "Unavailable For Legal Reasons",
  [HTTP_INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [HTTP_NOT_IMPLEMENTED]: "Not Implemented",
  [HTTP_BAD_GATEWAY]: "Bad Gateway",
  [HTTP_SERVICE_UNAVAILABLE]: "Service Unavailable",
  [HTTP_GATEWAY_TIMEOUT]: "Gateway Timeout",
  [HTTP_HTTP_VERSION_NOT_SUPPORTED]: "HTTP Version Not Supported",
  [HTTP_VARIANT_ALSO_NEGOTIATES]: "Variant Also Negotiates",
  [HTTP_INSUFFICIENT_STORAGE]: "Insufficient Storage",
  [HTTP_LOOP_DETECTED]: "Loop Detected",
  [HTTP_NOT_EXTENDED]: "Not Extended",
  [HTTP_NETWORK_AUTHENTICATION_REQUIRED]: "Network Authentication Required",
};

// Custom Messages for Specific Scenarios
export const EMPTY_DATA_MESSAGE = "No data available.";
export const DATA_RETRIEVAL_SUCCESS_MESSAGE = "Data retrieved successfully.";
export const DB_QUERY_ERROR_MESSAGE = "Error occurred while querying the database.";
export const DB_CONNECTION_ERROR_MESSAGE = "Database connection error.";
export const SERVER_ERROR_MESSAGE = "An unexpected server error occurred.";
