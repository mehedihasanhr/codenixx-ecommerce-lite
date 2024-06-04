<?php
use Carbon\Carbon;

if (!function_exists('convertToUTC')) {
    /**
     * Convert a date string from a given format and timezone to UTC.
     *
     * @param string $dateString
     * @param string $format
     * @param string $timezone
     * @return Carbon|null
     */
    function convertToUTC($dateString, $format = 'm-d-Y', $timezone = 'UTC')
    {
        try {
            return Carbon::createFromFormat($format, $dateString, $timezone)
                ->endOfDay()
                ->setTimezone('UTC');
        } catch (\Exception $e) {
            // Handle the exception if needed, or return null
            return null;
        }
    }
}
